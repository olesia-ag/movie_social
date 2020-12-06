import React from 'react';
import classes from './DisplayMovies.module.css';
import { SingleMovie } from '../SingleMovie';
import { withFirebase } from '../../firebase/context';
import Button from '../UI/Button/Button';
import LimitWarning from '../LimitWarning/LimitWarning';

const DisplayMovies = ({
	userId,
	favorite,
	searched,
	toWatch,
	movies,
	add,
	remove,
	isFavorite,
	totalResults,
	foundMovie,
	handleClickNext,
	handleClickPrev,
	currentPage,
	limitReached,
	...rest
}) => {
	let displayMovies;
	if (favorite) {
		displayMovies = <p>your favorite movies will appear here</p>;
		if (movies.length) {
			displayMovies = (
				<div>
					{!userId && limitReached ? <LimitWarning /> : null}
					<h5>Your favorite movies:</h5>
					<ol className={classes.DisplayMoviesList}>
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
		displayMovies = <p>search for movies to start </p>;
		if (movies.length) {
			displayMovies = (
				<>
					<h5>
						Found {totalResults} results for "{foundMovie}":
					</h5>
					<ol
						start={currentPage === 1 ? 1 : currentPage * 10}
						className={classes.DisplayMoviesList}>
						{movies.map((movie) => (
							<li key={movie.imdbID}>
								<SingleMovie
									title={movie.Title}
									id={movie.imdbID}
									poster={movie.Poster}
									released={movie.Year}
									addFavorite={() => add(movie, userId, rest.firebase)}
									//limit exists only if user is not logged in
									disableAdd={
										limitReached && !userId ? true : isFavorite(movie.imdbID)
									}
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
