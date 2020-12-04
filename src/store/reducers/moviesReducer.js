import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	foundMovies: [],
	error: null,
	loading: false,
	totalResults: null
};



const searchMoviesStart = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};

const searchMoviesSuccess = (state, action) => {
	return updateObject(state, { loading: false, foundMovies: action.movies, totalResults: action.totalResults });
};

const searchMoviesFail = (state, action) => {
	return updateObject(state, { loading: false, error: action.error });
};

const moviesReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SEARCH_MOVIES_START:
			return searchMoviesStart(state, action);

		case actionTypes.SEARCH_MOVIES_SUCCESS:
			return searchMoviesSuccess(state, action);

		case actionTypes.SEARCH_MOVIES_FAILED:
			return searchMoviesFail(state, action);

		default:
			return state;
	}
};

export default moviesReducer;
