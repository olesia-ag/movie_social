import React from 'react';
import classes from './DisplayFriends.module.css';
import { withFirebase } from '../../firebase/context';

const DisplayFriends = ({
	loading,
	error,
	friends,
	searchedFriend,
	sendFriendRequest,
	user,
	...rest
}) => {
	let displayFriends = <p>start searching for friends</p>;
	if (loading) {
		displayFriends = <p>loading...</p>;
	}
	if (friends.length) {
		displayFriends = (
			<>
				<h5>Found for '{searchedFriend}':</h5>
				<ul className={classes.DisplayFriendssList}>
					{friends.map((friend) => (
						<li key={friend.id}>
							{friend.name}
							<button
								onClick={() =>
									sendFriendRequest(friend.id, user, rest.firebase)
								}>
								add friend
							</button>
						</li>
					))}
				</ul>
			</>
		);
	}

	return (
		<div className={classes.DisplayFriendsContainer}>{displayFriends}</div>
	);
};

export default withFirebase(DisplayFriends);
