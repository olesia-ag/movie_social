import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  foundMovies: [],
  favoriteMovies: [],
  error: null,
  loading: false,
  limitReached : false
};
