import React, { useContext } from 'react';
import classes from './NominatedMovies.module.css';
import SingleMovie from '../../components/SingleMovie/SingleMovie';
import LimitWarning from '../../components/LimitWarning/LimitWarning';

const NominatedMovies = (props) => {
	// const { removeMovie, checkLimit, movies } = useContext(
	// 	NominatedMoviesContext
	// );
	// let displayMovies;
	// if (movies.length === 0) {
	// 	displayMovies = <p>nominate some movies first!</p>;
	// } else {
	// 	displayMovies = (
	// 		<>
	// 			<ol>
	// 				{movies.map((movie) => {
	// 					return (
	// 						<li key={movie.imdbID}>
	// 							<SingleMovie
	// 								title={movie.Title}
	// 								released={movie.Year}
	// 								poster={movie.Poster}
	// 								remove={() => removeMovie(movie.imdbID)}
	// 								nominated
	// 							/>
	// 						</li>
	// 					);
	// 				})}
	// 			</ol>
	// 		</>
	// 	);
	// }

	return (
		// <div className={classes.NominatedMoviesContainer}>
		// 	<h5>Nominated movies:</h5>
		// 	{checkLimit() ? <LimitWarning /> : null}
		// 	<div>{displayMovies}</div>
		// </div>
		<div>nominated movies</div>
	);
};

export default NominatedMovies;
