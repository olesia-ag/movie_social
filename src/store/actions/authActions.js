import * as actionTypes from './actionTypes';


export const authClear = () => {
	return {
		type: actionTypes.AUTH_CLEAR,
	};
};

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (idToken, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: idToken,
		userId: userId,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAILED,
		error: error,
	};
};

export const logout = () => {
  console.log('logout was called')
	localStorage.removeItem('token');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const auth = (email, password, isSignUp, firebase) => {
	return (dispatch) => {
		dispatch(authStart());
		if (isSignUp) {
			firebase
				.createUser(email, password)
				.then((res) => {
					dispatch(authSuccess(res.user.refreshToken, res.user.uid));
					localStorage.setItem('token', res.user.refreshToken);
					localStorage.setItem('userId', res.user.uid);
				})
				.catch((err) => {
					console.log('error', err);
					dispatch(authFail(err));
				});
		}
		//refactor? (can't create a methods with custom name in Firebase constructor)
		else {
			firebase
				.signInUser(email, password)
				.then((res) => {
					dispatch(authSuccess(res.user.refreshToken, res.user.uid));
					localStorage.setItem('token', res.user.refreshToken);
					localStorage.setItem('userId', res.user.uid);
				})
				.catch((err) => dispatch(authFail(err)));
		}
	};
};

export const setAuthRedirect = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const authCheckState = () => {
  console.log('went to check state')
	return (dispatch) => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const userId = localStorage.getItem('userId');
			dispatch(authSuccess(token, userId));
		}
	};
};
