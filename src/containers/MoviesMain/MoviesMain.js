import React, { useState } from 'react';
import { NominatedMovies } from '../NominatedMovies/';
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

	let showMovies = null;
	if (props.foundMovies.length) {
		showMovies = (
			<div className={classes.NominatedMovies}>
				<DisplayMovies
					foundMovie={movieToFind}
					addMovie={props.addToFavorites}
					checkIfNominated={props.checkIfNominated}
					checkLimit={props.checkLimit}
					movies={props.foundMovies}
				/>
			</div>
		);
	}

	return (
		<div className={classes.LayoutContainer}>
			<div className={classes.FindContainer}>
				<FindMovies
					findMovies={() => props.findMovies(movieToFind)}
					submitHandler={submitHandler}
					inputChangedHandler={inputChangedHandler}
					movieToFind={movieToFind}
				/>
			</div>
			{showMovies}
			<div className={classes.MoviesContainer}></div>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesMain);
