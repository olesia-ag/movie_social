import {combineReducers} from 'redux'
import authReducer from './authReducer';
import moviesReducer from './moviesReducer';
import favoriteMoviesReducer from './favoriteMoviesReducer';
import friendsReducer from './friendsReducer';
import * as actionTypes from '../actions/actionTypes';

const appReducer = combineReducers({
	auth: authReducer,
  movies: moviesReducer,
  favoriteMovies: favoriteMoviesReducer,
  friends: friendsReducer
});


//wipes out redux state if uswr logs out by reassigning the reference of a local variable 'state' and passing it to rootReducer
const rootReducer = (state, action) => {
  console.log('action type:', action.type)
  if(action.type === actionTypes.AUTH_LOGOUT){
    state=undefined
  }
  return appReducer(state, action)
}

export default rootReducer
