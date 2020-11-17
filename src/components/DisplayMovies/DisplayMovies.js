import React from 'react';
import classes from './DisplayMovies.module.css';
import { SingleMovie } from '../SingleMovie';

const DisplayMovies = ({ foundMovie, addFavorite, movies, checkFavorite }) => {
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
							addFavorite={() => addFavorite(movie)}
							disableAdd={checkFavorite(movie.imdbID)}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default DisplayMovies;
