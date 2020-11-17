import React from 'react';
import Button from '../UI/Button/Button';
import classes from './SingleMovie.module.css';

const SingleMovie = ({
	title,
	remove,
	released,
	nominate,
	nominated,
	disable,
}) => (
	<div className={classes.MovieContainer}>
		<span className={classes.Movie}>
			{title} ({released})
		</span>
		<span className={classes.Button}>
				{nominated ? (
			<Button clicked={remove}>REMOVE</Button>
		) : (
			<Button clicked={nominate} disabled={disable}>
				NOMINATE
			</Button>
		)}
		</span>

	</div>
);

export default SingleMovie;
