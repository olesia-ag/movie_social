import React from 'react';
import Button from '../../components/UI/Button/Button';
import { withFirebase } from '../../firebase/context';
import classes from './FindFriends.module.css';

const FindMovies = ({
	nameToFind,
	submitHandler,
	findUsers,
	inputChangedHandler,
	user,
	...rest
}) => {
	return (
		<div className={classes.FormContainer}>
			<form onSubmit={submitHandler} className={classes.FindFriendsForm}>
				<input
					className={classes.FindFriendsInput}
					onChange={(e) => inputChangedHandler(e)}
					label='title'
					placeholder="your friend's name"
				/>

				<Button
					btnType='Success'
					clicked={() => findUsers(nameToFind, user, rest.firebase)}>
					SUBMIT
				</Button>
			</form>
		</div>
	);
};

export default withFirebase(FindMovies);
