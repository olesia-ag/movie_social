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
					.set({ friend });
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

export const fetchOutgoingRequestsStart = () => {
	return {
		type: actionTypes.FETCH_OUTGOING_REQUESTS_START,
	};
};

export const fetchOutgoingRequests = (userId, firebase) => {
	return (dispatch) => {
		dispatch(fetchOutgoingRequestsStart());
		firebase.db
			.collection('users')
			.doc(userId)
			.collection('outgoingRequests')
			.get()
			.then((res) => {
				let foundOutgoingRequests = [];
				res.forEach((doc) => {
					foundOutgoingRequests.push({ id: doc.id, ...doc.data() });
				});
				return foundOutgoingRequests;
			})
			.then((arr) => dispatch(fetchOutgoingRequestsSuccess(arr)))
			.catch((error) => {
				fetchOutgoingRequestsFailed(error);
			});
	};
};

export const fetchOutgoingRequestsSuccess = (outgoingRequests) => {
	return {
		type: actionTypes.FETCH_OUTGOING_REQUESTS_SUCCESS,
		outgoingRequests,
	};
};

export const fetchOutgoingRequestsFailed = (error) => {
	return {
		type: actionTypes.FETCH_OUTGOING_REQUESTS_FAILED,
		error,
	};
};

export const watchOutgoingRequests = () => {
	return;
};

export const fetchIncomingRequestsStart = () => {
	return {
		type: actionTypes.FETCH_INCOMING_REQUESTS_START,
	};
};

export const fetchIncomingRequests = (userId, firebase) => {
	return (dispatch) => {
		dispatch(fetchIncomingRequestsStart());
		firebase.db
			.collection('users')
			.doc(userId)
			.collection('incomingRequests')
			.get()
			.then((res) => {
				let foundIncomingRequests = [];
				res.forEach((doc) => {
					foundIncomingRequests.push({ id: doc.id, ...doc.data() });
				});
				return foundIncomingRequests;
			})
			.then((arr) => {
				dispatch(fetchIncomingRequestsSuccess(arr));
			})
			.catch((error) => {
				fetchIncomingRequestsFailed(error);
			});
	};
};

export const fetchIncomingRequestsSuccess = (incomingRequests) => {
	return {
		type: actionTypes.FETCH_INCOMING_REQUESTS_SUCCESS,
		incomingRequests
	};
};

export const fetchIncomingRequestsFailed = (error) => {
	return {
		type: actionTypes.FETCH_INCOMING_REQUESTS_FAILED,
		error
	};
};

export const watchIncomingRequests = () => {
	return;
};
