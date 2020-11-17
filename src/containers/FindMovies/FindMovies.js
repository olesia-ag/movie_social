import React from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './FindMovies.module.css';

const FindMovie = ({
	fetchMovies,
	submitHandler,
	inputChangedHandler,
	movieToFind,
}) => (
	<div className={classes.FormContainer}>
		<form className={classes.Form} onSubmit={submitHandler}>
			<input
				onChange={(e) => inputChangedHandler(e)}
				label='title'
				placeholder='Harry Potter'
			/>

			<Button
				btnType='Success'
				clicked={() => fetchMovies()}
				disabled={movieToFind.length === 0}>
				SUBMIT
			</Button>
		</form>
	</div>
);

export default FindMovie;
