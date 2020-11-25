import React from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './FindMovies.module.css';

const FindMovies = ({
	findMovies,
	submitHandler,
	inputChangedHandler,
	movieToFind,
}) => (
	<div className={classes.FormContainer}>
		<form className={classes.FindMoviesForm} onSubmit={submitHandler}>
			<input
			className={classes.FindMoviesInput}
				onChange={(e) => inputChangedHandler(e)}
				label='title'
				placeholder='movie title: Harry Potter'
			/>

			<Button
				btnType='Success'
				clicked={() => findMovies()}
				disabled={movieToFind.length === 0}>
				SUBMIT
			</Button>
		</form>
	</div>
);

export default FindMovies;
