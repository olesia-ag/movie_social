import React from 'react';
import classes from './DisplayMovies.module.css';
import {SingleMovie} from '../SingleMovie';

const DisplayMovies = ({
	foundMovie,
	addMovie,
	checkIfNominated,
	checkLimit,
	movies
}) => {
	return (
		<div className={classes.DisplayMoviesContainer}>
			<h5>Found for '{foundMovie}':</h5>
			<ul className={classes.DisplayMoviesList}>
				{movies.map((movie) => (
					<li key={movie.imdbID}>
						<SingleMovie
							title={movie.Title}
							id={movie.imdbID}
							poster={movie.Poster}
							released={movie.Year}
							// nominate={() => addMovie(movie)}
							// disable={checkIfNominated(movie.imdbID) || checkLimit()}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default DisplayMovies;
