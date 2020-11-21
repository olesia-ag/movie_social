import React, { useEffect, useState } from 'react';
import { FindMovies } from '../../components/FindMovies';
import { DisplayMovies } from '../../components/DisplayMovies';
import { withFirebase } from '../../firebase/context';
import classes from './MoviesMain.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const MoviesMain = (props) => {
	const [movieToFind, setMovieToFind] = useState('');

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
	useEffect(() => {
		if (props.userId) {
			props.watchFavorites(props.userId, props.firebase);
		}
	}, [props.userId]);

	return (
		<div className={classes.MoviesMainContainer}>
			<div className={classes.FindContainer}>
				<FindMovies
					findMovies={() => props.findMovies(movieToFind)}
					submitHandler={submitHandler}
					inputChangedHandler={inputChangedHandler}
					movieToFind={movieToFind}
				/>
			</div>
			<div className={classes.MoviesContainer}>
				<div className={classes.FavoriteMovies}>
					<DisplayMovies
						favorite
						movies={props.favoriteMovies}
						remove={props.removeFavorite}
						userId={props.userId}
					/>
				</div>
				<div className={classes.FoundMovies}>
					<DisplayMovies
						searched
						movies={props.foundMovies}
						add={props.addFavorite}
						foundMovie={movieToFind}
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
		favoriteMovies: state.favoriteMovies.favoriteMovies,
		limitReached: state.favoriteMovies.limitReached,
		userId: state.auth.userId,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		findMovies: (movieTitle) => dispatch(actions.searchMovies(movieTitle)),
		addFavorite: (movie, userId, firebase) =>
			dispatch(actions.addFavorite(movie, userId, firebase)),
		removeFavorite: (movieId, userId, firebase) =>
			dispatch(actions.removeFavorite(movieId, userId, firebase)),
		watchFavorites: (userId, firebase) =>
			dispatch(actions.watchFavorites(userId, firebase)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withFirebase(MoviesMain));
