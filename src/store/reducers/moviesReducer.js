import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { authStart } from '../actions/authActions';

const initialState = {
	foundMovies: [],
	favoriteMovies: [],
	error: null,
	loading: false,
	limitReached: false,
};

const searchMoviesStart = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};

const searchMoviesSuccess = (state, action) => {
	return updateObject(state, { loading: false, movies: action.movies });
};

const searchMoviesFail = (state, action) => {
	return updateObject(state, { loading: false, error: action.error });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SEARCH_MOVIES_START:
			return authStart(state, action);

		case actionTypes.SEARCH_MOVIES_SUCCESS:
			return searchMoviesSuccess(state, action);

		case actionTypes.SEARCH_MOVIES_FAILED:
			return searchMoviesFail(state, action);

		default:
			return state;
	}
};

export default reducer
