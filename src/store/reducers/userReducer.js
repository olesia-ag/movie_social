import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	foundFriends: [],
	error: null,
	loading: false,
};


const searchFriendsStart = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};

const searchFriendsSuccess = (state, action) => {
  console.log('found friends', action.foundFriends)
	return updateObject(state, { loading: false, foundFriends: action.foundFriends });
};

const searchFriendsFail = (state, action) => {
	return updateObject(state, { loading: false, error: action.error });
};

const moviesReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FIND_FRIENDS_START:
			return searchFriendsStart(state, action);

		case actionTypes.FIND_FRIENDS_SUCCESS:
			return searchFriendsSuccess(state, action);

		case actionTypes.FIND_FRIENDS_FAILED:
			return searchFriendsFail(state, action);

		default:
			return state;
	}
};

export default moviesReducer;
