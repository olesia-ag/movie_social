import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	foundMovies: [],
	favoriteMovies: [],
	error: null,
	loading: false,
	limitReached: false,
};

const addFavorite = (state, action) => {
	const newFavoriteMovies = state.favoriteMovies.concat(action.movie);
	return updateObject(state, { favoriteMovies: newFavoriteMovies });
};

const removeFavorite = (state, action) => {
	const newFavoriteMovies = state.favoriteMovies.filter(
		(movie) => movie.imdbID !== action.movieId
	);
	return updateObject(state, { favoriteMovies: newFavoriteMovies });
};

const searchMoviesStart = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};

const searchMoviesSuccess = (state, action) => {
	return updateObject(state, { loading: false, foundMovies: action.movies });
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

		case actionTypes.ADD_FAVORITE_MOVIE:
			return addFavorite(state, action);

		case actionTypes.REMOVE_FAVORITE_MOVIE:
			return removeFavorite(state, action);

		default:
			return state;
	}
};

export default moviesReducer;
