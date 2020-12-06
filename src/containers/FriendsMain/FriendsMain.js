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
		<div>
			<FindFriends
				findFriends={props.findFriends}
				submitHandler={submitHandler}
				inputChangedHandler={inputChangedHandler}
				nameToFind={nameToFind}
				userId={props.userId}
			/>
			<DisplayFriends
				error={props.error}
				loading={props.loading}
				friends={props.foundFriends}
				searchedFriend={nameToFind}
				sendFriendRequest={props.sendFriendRequest}
				user={{id: props.userId, name: props.name}}
			/>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		foundFriends: state.friends.foundFriends,
		error: state.friends.error,
		loading: state.friends.loading,
		userId: state.auth.userId,
		name: state.auth.name
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		findFriends: (name, userId, firebase) =>
			dispatch(actions.findFriends(name, userId, firebase)),
		sendFriendRequest: (friendId, user, firebase) =>
			dispatch(actions.sendFriendRequest(friendId, user, firebase)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withFirebase(FriendsMain));
