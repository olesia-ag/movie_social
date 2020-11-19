import React from 'react';
import classes from './DisplayMovies.module.css';
import { SingleMovie } from '../SingleMovie';
import { withFirebase } from '../../firebase/context';

const DisplayMovies = ({
	favorite,
	searched,
	toWatch,
	foundMovie,
	movies,
	add,
	remove,
	isFavorite,
	...rest
}) => {
	let displayMovies;
	if (favorite) {
		displayMovies = <p>nominate some movies first!</p>;
		if (movies.length) {
			displayMovies = (
				<div>
					<ol>
						{movies.map((movie) => (
							<li key={movie.imdbID}>
								<SingleMovie
									title={movie.Title}
									released={movie.Year}
									poster={movie.Poster}
									remove={() => remove(movie.imdbID)}
									isFavorite
								/>
							</li>
						))}
					</ol>
				</div>
			);
		}
	} else {
		displayMovies = <p>search for movies first!</p>;
		if (movies.length) {
			displayMovies = (
				<>
					<h5>Found for '{foundMovie}':</h5>
					<ul className={classes.DisplayMoviesList}>
						{movies.map((movie) => (
							<li key={movie.imdbID}>
								<SingleMovie
									title={movie.Title}
									id={movie.imdbID}
									poster={movie.Poster}
									released={movie.Year}
									addFavorite={() => add(movie, rest.firebase)}
									disableAdd={isFavorite(movie.imdbID)}
								/>
							</li>
						))}
					</ul>
				</>
			);
		}
	}

	return <div className={classes.DisplayMoviesContainer}>{displayMovies}</div>;
};

export default withFirebase(DisplayMovies);
