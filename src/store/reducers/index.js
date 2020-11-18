import {combineReducers} from 'redux'
import authReducer from './authReducer';
import moviesReducer from './moviesReducer';
import favoriteMoviesReducer from './favoriteMoviesReducer';



const rootReducer = combineReducers({
	auth: authReducer,
  movies: moviesReducer,
  favoriteMovies: favoriteMoviesReducer
});

export default rootReducer
