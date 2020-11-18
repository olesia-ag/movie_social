import * as actionTypes from './actionTypes';
import axios from 'axios';



//for logged in user, fetch from db
// export const fetchFavoriteMovies = () =>{
//   return(dispatch) => {

//   }
// }

export const fetchFromStorage = () => {
	return (dispatch) => {
    const moviesArr = JSON.parse(localStorage.getItem('Movies'));
    console.log('went to fetch from storage', moviesArr)
		if (moviesArr) {
			dispatch(fetchFavoriteMoviesSuccess(moviesArr));
		}
	};
};

export const fetchFavoriteMoviesStart = () => {
	return {
		type: actionTypes.FETCH_FAVORITE_MOVIES_START,
	};
};

export const fetchFavoriteMoviesSuccess = (favoriteMovies) => {
  console.log('success')
	return {
		type: actionTypes.FETCH_FAVORITE_MOVIES_SUCCESS,
		favoriteMovies,
	};
};

export const fetchFavoriteMoviesFailed = (error) => {
	return {
		type: actionTypes.FETCH_FAVORITE_MOVIES_FAILED,
		error,
	};
};

export const addFavorite = (movie) => {
	return {
		type: actionTypes.ADD_FAVORITE_MOVIE,
		movie,
	};
};

export const removeFavorite = (movieId) => {
	return {
		type: actionTypes.REMOVE_FAVORITE_MOVIE,
		movieId,
	};
};

export const searchMoviesStart = () => {
	return {
		type: actionTypes.SEARCH_MOVIES_START,
	};
};

export const searchMovies = (movieTitle) => {
	return (dispatch) => {
		dispatch(searchMoviesStart());
		const query = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&type="movie"&s="${movieTitle}"&`;
		console.log('query', query);
		axios
			.get(query, {
				timeout: 6000,
			})
			.then((res) => {
				if (res.data.Response === 'False') throw Error(res.data.Error);
				else {
					dispatch(searchMoviesSuccess(res.data.Search));
				}
			})
			.catch((error) => {
				dispatch(searchMoviesFailed(error));
			});
	};
};

export const searchMoviesSuccess = (movies) => {
	return {
		type: actionTypes.SEARCH_MOVIES_SUCCESS,
		movies,
	};
};

export const searchMoviesFailed = (error) => {
	return {
		type: actionTypes.SEARCH_MOVIES_FAILED,
		error,
	};
};
