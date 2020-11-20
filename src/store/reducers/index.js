import {combineReducers} from 'redux'
import authReducer from './authReducer';
import moviesReducer from './moviesReducer';
import favoriteMoviesReducer from './favoriteMoviesReducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
	auth: authReducer,
  movies: moviesReducer,
  favoriteMovies: favoriteMoviesReducer,
  user: userReducer
});

export default rootReducer
