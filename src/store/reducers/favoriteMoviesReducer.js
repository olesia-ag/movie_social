import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	favoriteMovies: [],
	error: null,
	loading: false,
	limitReached: false,
};

const checkLimit = (arr) => {
	if (arr.length >= 3) return true;
	else return false;
};

const addFavorite = (state, action) => {
	const newFavoriteMovies = state.favoriteMovies.concat(action.movie);
	return updateObject(state, {
		favoriteMovies: newFavoriteMovies,
		limitReached: checkLimit(newFavoriteMovies),
	});
};

const removeFavorite = (state, action) => {
	const newFavoriteMovies = state.favoriteMovies.filter(
		(movie) => movie.imdbID !== action.movieId
	);
	return updateObject(state, {
		favoriteMovies: newFavoriteMovies,
		limitReached: checkLimit(newFavoriteMovies),
	});
};

const fetchFavoritesSuccess = (state, action) => {
	return updateObject(state, {
		favoriteMovies: action.favoriteMovies,
		limitReached: checkLimit(action.favoriteMovies),
	});
};

const clearFavorites = (state, action) => {
	return updateObject(state, { favoriteMovies: [] });
};

const favoriteMoviesReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_FAVORITE_MOVIE_SUCCESS:
			return addFavorite(state, action);

		case actionTypes.REMOVE_FAVORITE_MOVIE_SUCCESS:
			return removeFavorite(state, action);

		case actionTypes.FETCH_FAVORITE_MOVIES_SUCCESS:
			return fetchFavoritesSuccess(state, action);

		case actionTypes.AUTH_LOGOUT:
			return clearFavorites(state, action);

		default:
			return state;
	}
};

export default favoriteMoviesReducer;
