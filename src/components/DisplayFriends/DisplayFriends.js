import React from 'react';
import classes from './DisplayFriends.module.css';
import { withFirebase } from '../../firebase/context';
import SingleFriend from '../SingleFriend/SingleFriend';

const DisplayFriends = ({
	loading,
	error,
	friends,
	searchedFriend,
	sendFriendRequest,
	user,
	usersFriends,
	...rest
}) => {
	let displayFriends;
	if (loading) {
		displayFriends = <p>loading...</p>;
	} else if (usersFriends) {
		displayFriends = <p> you dont' have any friends here yet :(</p>;
		if (friends.length) {
			displayFriends = (
				<div>
					<h5>Your friends:</h5>
					<ul>
						{friends.map((friend) => (
							<li key={friend.id}>
								<SingleFriend remove={() => {}} isFriend />
							</li>
						))}
					</ul>
				</div>
			);
		}
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
									sendFriendRequest(friend, user, rest.firebase)
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
