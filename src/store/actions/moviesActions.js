import * as actionTypes from './actionTypes';
import axios from 'axios';

export const searchMoviesStart = () => {
	return {
		type: actionTypes.SEARCH_MOVIES_START,
	};
};

export const searchMovies = (movieTitle, pageNum) => {
	return (dispatch) => {
		dispatch(searchMoviesStart());
		const query = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&type="movie"&s="${movieTitle}"&page=${pageNum}`;
		axios
			.get(query, {
				timeout: 6000,
			})
			.then((res) => {
				if (res.data.Response === 'False') throw Error(res.data.Error);
				else {
					dispatch(searchMoviesSuccess(res.data, movieTitle));
				}
			})
			.catch((error) => {
				dispatch(searchMoviesFailed(error));
			});
	};
};

export const searchMoviesSuccess = (data, movieTitle) => {
	return {
		type: actionTypes.SEARCH_MOVIES_SUCCESS,
		movies: data.Search,
		totalResults: data.totalResults,
		foundMovie: movieTitle
	};
};

export const searchMoviesFailed = (error) => {
	return {
		type: actionTypes.SEARCH_MOVIES_FAILED,
		error,
	};
};
