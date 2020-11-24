import * as actionTypes from './actionTypes';

export const fetchFavoriteMoviesStart = () => {
	return {
		type: actionTypes.FETCH_FAVORITE_MOVIES_START,
	};
};

export const fetchFavorites = (userId, firebase) => {
	return (dispatch) => {
		if (userId) {
			firebase.db
				.collection('users')
				.doc(userId)
				.collection('favoriteMovies')
				.get()
				.then((res) => {
					let foundMovies = [];
					res.forEach((doc) => {
						foundMovies.push({ id: doc.id, ...doc.data() });
					});
					return foundMovies;
				})
				.then((arr) => dispatch(fetchFavoriteMoviesSuccess(arr)))
				.catch(function (error) {
					fetchFavoriteMoviesFailed(error);
				});
		} else {
			const moviesArr = JSON.parse(localStorage.getItem('favoriteMovies'));
			if (moviesArr) {
				dispatch(fetchFavoriteMoviesSuccess(moviesArr));
			}
		}
	};
};

export const watchFavorites = (userId, firebase) => {
	return (dispatch) => {
		if (userId) {
			firebase.db
				.collection('users')
				.doc(userId)
				.collection('favoriteMovies')
				.onSnapshot(async (querySnapshot) => {
					console.log('firebase watching...');
					var favMovies = [];
					await querySnapshot.forEach(function (doc) {
						favMovies.push(doc.data());
					});
					dispatch(fetchFavoriteMoviesSuccess(favMovies));
				});
		} else {
			return (dispatch) => {
				const moviesArr = JSON.parse(localStorage.getItem('Movies'));
				if (moviesArr) {
					dispatch(fetchFavoriteMoviesSuccess(moviesArr));
				}
			};
		}
	};
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
export const addFavorite = (movie, userId, firebase) => {
	return (dispatch) => {
		if (userId) {
			firebase.db
				.collection('users')
				.doc(userId)
				.collection('favoriteMovies')
				.doc(movie.imdbID)
				.set(movie)
				.then(() => {})
				.catch((err) => dispatch(addFavoriteFailed(err)));
		} else {
			let favoriteMovies = [];
			let favoriteMoviesStorage = JSON.parse(
				localStorage.getItem('favoriteMovies')
			);
			if (!favoriteMoviesStorage) {
				favoriteMovies.push(movie);
			} else {
				favoriteMovies = favoriteMoviesStorage.concat(movie);
			}
			localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
			dispatch(addFavoriteSuccess(movie));
		}
	};
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

export const removeFavorite = (movieId, userId, firebase) => {
	return (dispatch) => {
		if (userId) {
			firebase.db
				.collection('users')
				.doc(userId)
				.collection('favoriteMovies')
				.doc(movieId)
				.delete()
				.then(() => dispatch(removeFavoriteSuccess(movieId)))
				.catch((err) => dispatch(addFavoriteFailed(err)));
		} else {
			const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
			const newFavoriteMovies = favoriteMovies.filter(
				(movie) => movie.imdbID !== movieId
			);
			localStorage.setItem('favoriteMovies', JSON.stringify(newFavoriteMovies));
			dispatch(removeFavoriteSuccess(movieId));
		}
	};
};

export const removeFavoriteSuccess = (movieId) => {
	return {
		type: actionTypes.REMOVE_FAVORITE_MOVIE_SUCCESS,
		movieId
	};
};

export const removeFavoriteFailed = (error) => {
	return {
		type: actionTypes.REMOVE_FAVORITE_MOVIE_FAILED,
		error,
	};
};
