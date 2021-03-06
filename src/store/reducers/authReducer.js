import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	name: null,
	idToken: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: '/',
};
const authStart = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
	return updateObject(state, {
		idToken: action.idToken,
		userId: action.userId,
		error: null,
		loading: false,
		name: action.name
	});
};

const authFail = (state, action) => {
	return updateObject(state, { error: action.error, loading: false });
};

const authLogout = (state, action) => {
	return updateObject(state, { idToken: null, userId: null, name: null });
};

const setAuthRedirectPath = (state, action) => {
	return updateObject(state, { authRedirectPath: action.path });
};

const authClear = (state, action) => {
	return updateObject(state, { error: null, loading: false });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {

		case actionTypes.AUTH_START:
			return authStart(state, action);

		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);

		case actionTypes.AUTH_FAILED:
			return authFail(state, action);

		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);

		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return setAuthRedirectPath(state, action);

		case actionTypes.AUTH_CLEAR:
			return authClear(state, action);

		default:
			return state;
	}
};

export default reducer;
