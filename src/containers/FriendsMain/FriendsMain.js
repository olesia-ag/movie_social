import React, { useEffect, useState } from 'react';
import { withFirebase } from '../../firebase/context';
import classes from './FriendsMain.module.css';
import FindFriends from '../../components/FindFriends/FindFriends';
import DisplayFriends from '../../components/DisplayFriends/DisplayFriends';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const FriendsMain = (props) => {
	const [nameToFind, setNameToFind] = useState('');

	const submitHandler = (event) => {
		event.preventDefault();
	};

	const inputChangedHandler = (event) => {
		event.preventDefault();
		setNameToFind(event.target.value);
	};

	return (
		<div className={classes.FriendsMainContainer}>
			<div className={classes.FindContainer}>
				<p>view friend requests I sent</p>
				<FindFriends
					findUsers={props.findUsers}
					submitHandler={submitHandler}
					inputChangedHandler={inputChangedHandler}
					nameToFind={nameToFind}
					userId={props.userId}
				/>
			{/* displays found users */}
				<DisplayFriends
					error={props.error}
					loading={props.loading}
					friends={props.foundUsers}
					searchedFriend={nameToFind}
					sendFriendRequest={props.sendFriendRequest}
					user={{ id: props.userId, name: props.name }}
				/>
			</div>
			<div className={classes.CurrentFriendsContainer}>
				{/* <DisplayFriends usersFriends friends={props.foundFriends} /> */}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	// console.log('state.foundUsers', state.friends.foundUsers)
	return {
		foundUsers: state.friends.foundUsers,
		error: state.friends.error,
		loading: state.friends.loading,
		userId: state.auth.userId,
		name: state.auth.name,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		findUsers: (name, userId, firebase) =>
			dispatch(actions.findUsers(name, userId, firebase)),
		sendFriendRequest: (friend, user, firebase) =>
			dispatch(actions.sendFriendRequest(friend, user, firebase)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withFirebase(FriendsMain));
