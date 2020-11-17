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
	<div className={classes.SingleMovieContainer}>
		<span className={classes.SingleMovie}>
			{title} ({released})
		</span>
		<span className={classes.Button}>
				{nominated ? (
			<Button clicked={remove}>remove</Button>
		) : (
			<Button clicked={nominate} disabled={disable}>
				nominate
			</Button>
		)}
		</span>

	</div>
);

export default SingleMovie;
