import React, { useState } from 'react';
import NominatedMovies from '../NominatedMovies/NominatedMovies';
import FindMovies from '../FindMovies/FindMovies';
import classes from './MoviesMain.module.css';


const MoviesMain = (props) => {
	const [movieToFind, setMovieToFind] = useState('');
	const [foundMovies, setFoundMovies] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const submitHandler = (event) => {
		event.preventDefault();
		setLoading(true);
		setError(false);
	};

	const inputChangedHandler = (event) => {
		event.preventDefault();
		setError(null);
		setMovieToFind(event.target.value);
	};

	let showMovies = null;


	return (
		<div className={classes.LayoutContainer}>
			<div className={classes.FindContainer}>
find container
			</div>
			<div className={classes.MoviesContainer}>
				<div className={classes.NominatedMovies}>
found movies container
				</div>

			</div>
		</div>
	);
};

export default MoviesMain;
