import React, { useState } from 'react';
import { FavoriteMovies } from '../FavoriteMovies/';
import { FindMovies } from '../../components/FindMovies';
import { DisplayMovies } from '../../components/DisplayMovies';
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

	const checkFavorite = (movieID) => {
		if (props.favoriteMovies.some((movie) => movie.imdbID === movieID)) {
			return true;
		} else {
			return false;
		}
	};

	let showMovies = <p>start searching for something!</p>;
	if (props.foundMovies.length) {
		showMovies = (
			<>
				<DisplayMovies
					foundMovie={movieToFind}
					addFavorite={props.addFavorite}
					movies={props.foundMovies}
					checkFavorite={checkFavorite}
				/>
			</>
		);
	}

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
					<FavoriteMovies checkFavorite={checkFavorite}/>
				</div>
				<div className={classes.FoundMovies}>{showMovies}</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.movies.loading,
		error: state.movies.error,
		foundMovies: state.movies.foundMovies,
		favoriteMovies: state.movies.favoriteMovies,
		limitReached: state.movies.limitReached,
		//also should be some state of favorite movies added already
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		findMovies: (movieTitle) => dispatch(actions.searchMovies(movieTitle)),
		addFavorite: (movie) => dispatch(actions.addFavorite(movie)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesMain);
