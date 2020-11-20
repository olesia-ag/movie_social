import * as actionTypes from './actionTypes';

export const findFriends = (name, firebase) => {
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
			.then((arr) => dispatch(findFriendsSuccess(arr)))
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

export const findFriendsSuccess = (foundFriends) => {
	console.log('was dispatchd', foundFriends);
	return {
		type: actionTypes.FIND_FRIENDS_SUCCESS,
		foundFriends,
	};
};
