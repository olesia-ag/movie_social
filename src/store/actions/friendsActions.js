import * as actionTypes from './actionTypes';

export const findUsers = (name, userId, firebase) => {
	return (dispatch) => {
		firebase.db
			.collection('users')
			.where('name', '>=', name)
			.where('name', '<=', name + '\uf8ff')
			.get()
			.then((res) => {
				let foundFriends = [];
				res.forEach((doc) => {
					foundFriends.push({ id: doc.id, ...doc.data() });
				});
				return foundFriends;
			})
			.then((arr) => dispatch(findFriendsSuccess(arr, userId)))
			.catch(function (error) {
				findFriendsFailed(error);
			});
	};
};

export const findFriendsStart = () => {
	return {
		type: actionTypes.FIND_FRIENDS_START,
	};
};

export const findFriendsFailed = () => {
	return {
		type: actionTypes.FIND_FRIENDS_FAILED,
	};
};

export const findFriendsSuccess = (foundUsers, userId) => {
	return {
		type: actionTypes.FIND_FRIENDS_SUCCESS,
		foundUsers,
		userId,
	};
};

export const sendFriendRequestStart = () => {
	return {
		type: actionTypes.SEND_FRINED_REQUEST_START,
	};
};

export const sendFriendRequest = (friend, user, firebase) => {
	//get by friendId and set user information on incomingRequests collection
	return (dispatch) => {
		firebase.db
			.collection('users')
			.doc(friend.id)
			.collection('incomingRequests')
			.doc(user.id)
			.set(user)
			.then(() => {
				//get by user.id and set friendId on outgoingRequests collection
				firebase.db
					.collection('users')
					.doc(user.id)
					.collection('outgoingRequests')
					.doc(user.id)
					.set({friend});
			})
			.catch((err) => dispatch(sendFriendRequestFailed(err)));
	};
};

export const sendFriendRequestSuccess = () => {
	return {
		type: actionTypes.SEND_FRINED_REQUEST_SUCCESS,
	};
};

export const sendFriendRequestFailed = () => {
	return {
		type: actionTypes.SEND_FRIEND_REQUEST_FAILED,
	};
};
