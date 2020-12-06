import * as actionTypes from './actionTypes';

export const findFriends = (name, userId, firebase) => {
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

export const findFriendsSuccess = (foundFriends, userId) => {
	return {
		type: actionTypes.FIND_FRIENDS_SUCCESS,
		foundFriends,
		userId,
	};
};

export const sendFriendRequestStart = () => {
	return {
		type: actionTypes.SEND_FRINED_REQUEST_START,
	};
};

export const sendFriendRequest = (friendId, user, firebase) => {
	//set user information with user.id on friendRequest collection
	return (dispatch) => {
		firebase.db
			.collection('users')
			.doc(friendId)
			.collection('friendRequests')
			.doc(user.id)
			.set(user)
			.then((res) => {
				console.log('response', res);
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
