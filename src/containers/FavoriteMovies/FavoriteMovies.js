import React from 'react';
import classes from './FavoriteMovies.module.css';
import SingleMovie from '../../components/SingleMovie/SingleMovie';
import LimitWarning from '../../components/LimitWarning/LimitWarning';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const FavoriteMovies = ({ favoriteMovies, checkFavorite, removeFavorite }) => {
	let displayMovies = <p>nominate some movies first!</p>;
	if (favoriteMovies.length) {
		displayMovies = (
			<>
				<ol>
					{favoriteMovies.map((movie) => (
						<li key={movie.imdbID}>
							<SingleMovie
								title={movie.Title}
								released={movie.Year}
								poster={movie.Poster}
								remove={() => removeFavorite(movie.imdbID)}
								isFavorite={checkFavorite(movie.imdbID)}
							/>
						</li>
					))}
				</ol>
			</>
		);
	}

	return (
		<div className={classes.NominatedMoviesContainer}>
			<h5>Nominated movies:</h5>
			{/* {checkLimit() ? <LimitWarning /> : null} */}
			<div>{displayMovies}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		favoriteMovies: state.movies.favoriteMovies,
		limitReached: state.movies.limitReached,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		removeFavorite: (movieId) => dispatch(actions.removeFavorite(movieId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteMovies);
