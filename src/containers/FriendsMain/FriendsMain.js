import React, { useEffect, useState } from 'react';
import { withFirebase } from '../../firebase/context';
import classes from './FriendsMain.module.css';
import FindFriends from '../../components/FindFriends/FindFriends';
import DisplayFriends from '../../components/DisplayFriends/DisplayFriends';
import DisplayRequests from '../../components/DisplayRequests/DisplayRequests';
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

	//fetch both outgoing and incoming requests
	useEffect(() => {
		props.fetchIncomingRequests(props.userId, props.firebase);
		props.fetchOutgoingRequests(props.userId, props.firebase);
	}, []);

	return (
		<div className={classes.FriendsMainContainer}>
			<div className={classes.FindContainer}>
				<DisplayRequests loading={props.loadingIncoming} error={props.loadingIncomingError} requests={props.incomingRequests} userId={props.userId} />
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
	return {
		foundUsers: state.friends.foundUsers,
		incomingRequests: state.friends.incomingRequests,
		outgoingRequests: state.friends.outgoingRequests,
		loadingIncoming: state.friends.loadingIncoming,
		loadingOutgoing: state.friends.loadingOutgoing,
		loadingIncomingError: state.friends.loadingIncomingError,
		loadingOutgoingError: state.friends.loadingOutgoingError,
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
		fetchIncomingRequests: (userId, firebase) =>
			dispatch(actions.fetchIncomingRequests(userId, firebase)),
		fetchOutgoingRequests: (userId, firebase) =>
			dispatch(actions.fetchOutgoingRequests(userId, firebase)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withFirebase(FriendsMain));
