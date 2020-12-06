import React, { useEffect, useState } from 'react';
import { FindMovies } from '../../components/FindMovies';
import { DisplayMovies } from '../../components/DisplayMovies';
import { withFirebase } from '../../firebase/context';
import classes from './MoviesMain.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const MoviesMain = (props) => {
	const [movieToFind, setMovieToFind] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	const submitHandler = (event) => {
		event.preventDefault();
	};

	const inputChangedHandler = (event) => {
		event.preventDefault();
		setMovieToFind(event.target.value);
	};

	const checkIfFavorite = (movieID) => {
		if (props.favoriteMovies.some((movie) => movie.imdbID === movieID)) {
			return true;
		} else {
			return false;
		}
	};

	const handleClickNextPage = () => {
		setCurrentPage((prevPage) => {
			return prevPage + 1;
		});
	};

	const handleClickPrevPage = () => {
		setCurrentPage((prevPage) => {
			return prevPage - 1;
		});
	};

	useEffect(() => {
		if (props.userId) {
			props.watchFavorites(props.userId, props.firebase);
		}
	}, [props.userId]);

	useEffect(() => {
		props.fetchFavorites(props.userId, props.firebase);
	}, []);

	useEffect(() => {
		props.findMovies(movieToFind, currentPage);
	}, [currentPage]);

	return (
		<div className={classes.MoviesMainContainer}>
			<div className={classes.FindContainer}>
				<FindMovies
					findMovies={() => props.findMovies(movieToFind, currentPage)}
					submitHandler={submitHandler}
					inputChangedHandler={inputChangedHandler}
					movieToFind={movieToFind}
				/>
			</div>
			<div className={classes.MoviesContainer}>
				<div className={classes.FavoriteMovies}>
					<DisplayMovies
						favorite
						limitReached={props.limitReached}
						movies={props.favoriteMovies}
						remove={props.removeFavorite}
						userId={props.userId}
					/>
				</div>
				<div className={classes.FoundMovies}>
					<DisplayMovies
						limitReached={props.limitReached}
						searched
						totalResults={props.totalResults}
						currentPage={currentPage}
						handleClickNext={handleClickNextPage}
						handleClickPrev={handleClickPrevPage}
						movies={props.foundMovies}
						add={props.addFavorite}
						foundMovie={props.foundMovie}
						isFavorite={checkIfFavorite}
						userId={props.userId}
					/>
				</div>
			</div>
		</div>
	);
};


const mapStateToProps = (state) => {
	return {
		loading: state.movies.loading,
		error: state.movies.error,
		foundMovies: state.movies.foundMovies,
		foundMovie: state.movies.foundMovie,
		favoriteMovies: state.favoriteMovies.favoriteMovies,
		limitReached: state.favoriteMovies.limitReached,
		userId: state.auth.userId,
		totalResults: state.movies.totalResults,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		findMovies: (movieTitle, pageNum) =>
			dispatch(actions.searchMovies(movieTitle, pageNum)),
		addFavorite: (movie, userId, firebase) =>
			dispatch(actions.addFavorite(movie, userId, firebase)),
		removeFavorite: (movieId, userId, firebase) =>
			dispatch(actions.removeFavorite(movieId, userId, firebase)),
		watchFavorites: (userId, firebase) =>
			dispatch(actions.watchFavorites(userId, firebase)),
		fetchFavorites: (userId, firebase) =>
			dispatch(actions.fetchFavorites(userId, firebase)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withFirebase(MoviesMain));
