import React from 'react';
import Button from '../../components/UI/Button/Button';
import { withFirebase } from '../../firebase/context';

const FindMovies = ({
	nameToFind,
	submitHandler,
	findFriends,
	inputChangedHandler,
	user,
	...rest
}) => {
	return (
		<div>
			<form onSubmit={submitHandler}>
				<input
					onChange={(e) => inputChangedHandler(e)}
					label='title'
					placeholder="your friend's name"
				/>

				<Button
					btnType='Success'
					clicked={() => findFriends(nameToFind, user, rest.firebase)}>
					SUBMIT
				</Button>
			</form>
		</div>
	);
};

export default withFirebase(FindMovies);
