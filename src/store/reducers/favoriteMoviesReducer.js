import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	favoriteMovies: [],
	error: null,
	loading: false,
	limitReached: false,
};



const addFavorite = (state, action) => {
  const newFavoriteMovies = state.favoriteMovies.concat(action.movie);
  localStorage.setItem('Movies', JSON.stringify(newFavoriteMovies ));
  let limit = false
  if(state.favoriteMovies.length === 4){
    limit = true
  }
	return updateObject(state, { favoriteMovies: newFavoriteMovies, limitReached: limit });
};

const removeFavorite = (state, action) => {
	const newFavoriteMovies = state.favoriteMovies.filter(
		(movie) => movie.imdbID !== action.movieId
  );
  localStorage.setItem('Movies', JSON.stringify(newFavoriteMovies ));
	return updateObject(state, { favoriteMovies: newFavoriteMovies, limitReached: false });
};

const fetchFavoritesSuccess = (state, action) => {
  return updateObject(state, { favoriteMovies: action.favoriteMovies});
}

const favoriteMoviesReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_FAVORITE_MOVIE:
			return addFavorite(state, action);

		case actionTypes.REMOVE_FAVORITE_MOVIE:
      return removeFavorite(state, action);

    case actionTypes.FETCH_FAVORITE_MOVIES_SUCCESS:
      return fetchFavoritesSuccess(state, action);

		default:
			return state;
	}
};

export default favoriteMoviesReducer;
