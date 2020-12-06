import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	foundUsers: [],
	incomingRequests: [],
	outgoingRequests: [],
	loadingIncoming: false,
	loadingIncomingError: null,
	loadingOutgoing: false,
	loadingOutgoingError: null,
	error: null,
	loading: false,
};

const fetchIncomingRequestsStart = (state, action) => {
	return updateObject(state, {
		loadingIncomingError: null,
		loadingIncoming: true,
	});
};

const fetchIncomingRequestsSuccess = (state, action) => {
	return updateObject(state, {
		loadingIncoming: false,
		//same reducer is used for watchRequests function
		loadingIncomingError: null,
		incomingRequests: action.incomingRequests,
	});
};

const fetchIncomingRequestsFailed = (state, action) => {
	return updateObject(state, {
		loadingIncoming: false,
		loadingIncomingError: action.error,
	});
};


const fetchOutgoingRequestsStart = (state, action) => {
	return updateObject(state, {
		loadingOutgoingError: null,
		loadingOutgoing: true,
	});
}

const fetchOutgoingRequestsSuccess = (state, action) => {
	return updateObject(state, {
		loadingOutgoing: false,
		//same reducer is used for watchRequests function
		loadingOutgoingError: null,
		outgoingRequests: action.outgoingRequests,
	});
};

const fetchOutgoingRequestsFailed = (state, action) => {
	return updateObject(state, {
		loadingOutgoing: false,
		loadingOutgoingError: action.error,
	});
};

const searchFriendsStart = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};

const searchFriendsSuccess = (state, action) => {
	//ensures that user will not be displayed to theirself
	const newFoundUsers = action.foundUsers.filter(
		(user) => user.id !== action.userId
	);
	return updateObject(state, { loading: false, foundUsers: newFoundUsers });
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

		case actionTypes.FETCH_INCOMING_REQUESTS_START:
			return fetchIncomingRequestsStart(state, action);

		case actionTypes.FETCH_INCOMING_REQUESTS_SUCCESS:
			return fetchIncomingRequestsSuccess(state, action);

		case actionTypes.FETCH_INCOMING_REQUESTS_FAILED:
			return fetchIncomingRequestsFailed(state, action);

		case actionTypes.FETCH_OUTGOING_REQUESTS_START:
				return fetchOutgoingRequestsStart(state, action);

		case actionTypes.FETCH_OUTGOING_REQUESTS_SUCCESS:
				return fetchOutgoingRequestsSuccess(state, action);

		case actionTypes.FETCH_OUTGOING_REQUESTS_FAILED:
				return fetchOutgoingRequestsFailed(state, action);

		default:
			return state;
	}
};

export default moviesReducer;
