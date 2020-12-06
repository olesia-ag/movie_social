import React from 'react';
import Button from '../UI/Button/Button';
import classes from './SingleFriend.module.css';

const SingleFriend = ({ title, remove, released, addFavorite, isFavorite, disableAdd }) => {

	return (
		<div className={classes.SingleFriendContainer}>
			<span className={classes.SingleFriend}>
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

export default SingleFriend;
