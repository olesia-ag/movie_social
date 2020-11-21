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

export const authSuccess = (idToken, userId, name) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken,
		userId,
		name
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAILED,
		error: error,
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const getUser = (firebase) => {
	return (dispatch) => {
		console.log(firebase.user());
	};
};

export const auth = (userData, isSignUp, firebase) => {

		//refactor? (a method with custom name in Firebase constructor?)
	return (dispatch) => {
		dispatch(authStart());
		if (isSignUp) {
			let createUser = firebase.createUser(userData.email, userData.password);
			let addData = createUser.then((res) =>
				firebase.db
					.collection('users')
					.doc(res.user.uid)
					.set({ name: userData.name })
			);
			return Promise.all([createUser, addData])
				.then(function ([createUserRes]) {
					localStorage.setItem('token', createUserRes.user.refreshToken);
					localStorage.setItem('userId', createUserRes.user.uid);
					localStorage.setItem('name', userData.name);
					dispatch(
						authSuccess(createUserRes.user.refreshToken, createUserRes.user.uid, userData.name)
					);
				})
				.catch((err) => {
					dispatch(authFail(err));
				});
		}
		else {
			let signIn = firebase.signInUser(userData.email, userData.password);
			let getData = signIn.then((res) =>
				firebase.db.collection('users').doc(res.user.uid).get()
			);
			let getName = getData.then((doc) => {
				let data = doc.get('name');
				return data;
			});
			return Promise.all([signIn, getData, getName])
				.then(function ([signInRes, getDataRes, getNameRes]) {
					localStorage.setItem('token', signInRes.user.refreshToken);
					localStorage.setItem('userId', signInRes.user.uid);
					localStorage.setItem('name', getNameRes);
					dispatch(
						authSuccess(signInRes.user.refreshToken, signInRes.user.uid, getNameRes)
					);
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

//will need to confirm the token
export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const userId = localStorage.getItem('userId');
			const name = localStorage.getItem('name')
			// console.log('got name', name)
			dispatch(authSuccess(token, userId, name));
		}
	};
};
