import * as actionTypes from './actionTypes';
import axios from 'axios';


export const fetchFavoriteMoviesStart = () => {
	return {
		type: actionTypes.FETCH_FAVORITE_MOVIES_START,
	};
};

export const fetchFavorites = (auth) => {
	if (!auth) {
		return (dispatch) => {
			const moviesArr = JSON.parse(localStorage.getItem('Movies'));
			if (moviesArr) {
				dispatch(fetchFavoriteMoviesSuccess(moviesArr));
			}
		};
	}
};

export const fetchFavoriteMoviesSuccess = (favoriteMovies) => {
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

//find user, add to existing array of favorite movies
export const addFavorite = (movie, firebaseDb) => {
	const favoriteMovies = JSON.parse(localStorage.getItem('Movies'));
	const newFavoriteMovies= favoriteMovies.concat(movie);
	localStorage.setItem('Movies', JSON.stringify(newFavoriteMovies ));
	// 	return dispatch => {
	// 		firebaseDb
	// 		.collection('users')
	// 		.add({
	// 		first: 'Ada',
	// 		last: 'Lovelace',
	// 		born: 1815,
	// 	})
	// 		.then(function (docRef) {
	// 			dispatch(addFavoriteSuccess())
	// 			console.log('Document written with ID: ', docRef.id);
	// 	})
	// 		.catch(function (error) {
	// 			dispatch(addFavoriteFailed(error))
	// 			console.error('Error adding document: ', error);
	// 	})
	// }
};

export const addFavoriteSuccess = (movie) => {
	return {
		type: actionTypes.ADD_FAVORITE_MOVIE_SUCCESS,
		movie,
	};
};

export const addFavoriteFailed = (error) => {
	return {
		type: actionTypes.ADD_FAVORITE_MOVIE_FAILED,
		error,
	};
};

//should remove rom db
export const removeFavorite = (movieId) => {
	return dispatch => {
		const favoriteMovies = JSON.parse(localStorage.getItem('Movies'));
		const newFavoriteMovies = favoriteMovies.filter(
			(movie) => movie.imdbID !== movieId
		);
		localStorage.setItem('Movies', JSON.stringify(newFavoriteMovies ));
		dispatch(removeFavoriteSuccess(movieId))
	};
};


export const removeFavoriteSuccess = (movieId) => {
	return {
		type: actionTypes.REMOVE_FAVORITE_MOVIE_SUCCESS,
		movieId
	}
}

export const removeFavoriteFailed = (error) => {
	return {
		type: actionTypes.REMOVE_FAVORITE_MOVIE_FAILED,
		error
	}
}
