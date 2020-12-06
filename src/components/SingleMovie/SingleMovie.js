import React from 'react';
import Button from '../UI/Button/Button';
import classes from './SingleMovie.module.css';

const SingleMovie = ({ title, remove, released, addFavorite, isFavorite, disableAdd }) => {
	// console.log('isFavorite', isFavorite());

	return (
		<div className={classes.SingleMovieContainer}>
			<span className={classes.SingleMovie}>
				{title} ({released})
			</span>
			<span className={classes.Button}>
				{isFavorite ? (
					<Button clicked={remove}>remove</Button>
				) : (
					<Button clicked={addFavorite} disabled={disableAdd}>
						add
					</Button>
				)}
			</span>
		</div>
	);
};

export default SingleMovie;
