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
					/>
				</div>
				<div className={classes.FoundMovies}>
					<DisplayMovies
						searched
						movies={props.foundMovies}
						add={props.addFavorite}
						foundMovie={movieToFind}
						isFavorite={checkIfFavorite}
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
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		findMovies: (movieTitle) => dispatch(actions.searchMovies(movieTitle)),
		addFavorite: (movie, db) => dispatch(actions.addFavorite(movie, db)),
		removeFavorite: (movieId) => dispatch(actions.removeFavorite(movieId))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withFirebase(MoviesMain));
