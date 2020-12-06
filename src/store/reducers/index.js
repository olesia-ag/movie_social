import {combineReducers} from 'redux'
import authReducer from './authReducer';
import moviesReducer from './moviesReducer';
import favoriteMoviesReducer from './favoriteMoviesReducer';
import friendsReducer from './friendsReducer';


const rootReducer = combineReducers({
	auth: authReducer,
  movies: moviesReducer,
  favoriteMovies: favoriteMoviesReducer,
  friends: friendsReducer
});

export default rootReducer
