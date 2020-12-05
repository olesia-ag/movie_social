import React from 'react';
import classes from './DisplayMovies.module.css';
import { SingleMovie } from '../SingleMovie';
import { withFirebase } from '../../firebase/context';
import Button from '../UI/Button/Button';

const DisplayMovies = ({
	userId,
	favorite,
	searched,
	toWatch,
	foundMovie,
	movies,
	add,
	remove,
	isFavorite,
	totalResults,
	handleClickNext,
	handleClickPrev,
	currentPage,
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
									remove={() => remove(movie.imdbID, userId, rest.firebase)}
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
					<h5>
						Found {totalResults} results for '{foundMovie}':
					</h5>
					<ol
						className={classes.DisplayMoviesList}
						start={currentPage === 1 ? 1 : currentPage * 10}>
						{movies.map((movie) => (
							<li key={movie.imdbID}>
								<SingleMovie
									title={movie.Title}
									id={movie.imdbID}
									poster={movie.Poster}
									released={movie.Year}
									addFavorite={() => add(movie, userId, rest.firebase)}
									disableAdd={isFavorite(movie.imdbID)}
								/>
							</li>
						))}
					</ol>
				</>
			);
		}
	}

	let displayPagination = null;
	if (totalResults > 10) {
		displayPagination = (
			<div className={classes.Pagination}>
				<Button clicked={() => handleClickPrev()}>previous </Button>
				<Button clicked={() => handleClickNext()}>next </Button>
			</div>
		);
	}

	return (
		<div className={classes.DisplayMoviesContainer}>
			{displayMovies}
			{displayPagination}
		</div>
	);
};

export default withFirebase(DisplayMovies);
