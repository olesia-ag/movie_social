import * as actionTypes from './actionTypes';
import axios from 'axios';



export const searchMoviesStart = () => {
	return {
		type: actionTypes.SEARCH_MOVIES_START,
	};
};

export const searchMovies = (movieTitle) => {
	return (dispatch) => {
		dispatch(searchMoviesStart());
		const query = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&type="movie"&s="${movieTitle}"&`;
		axios
			.get(query, {
				timeout: 6000,
			})
			.then((res) => {
				if (res.data.Response === 'False') throw Error(res.data.Error);
				else {
					console.log('response',res)
					dispatch(searchMoviesSuccess(res.data));
				}
			})
			.catch((error) => {
				dispatch(searchMoviesFailed(error));
			});
	};
};

export const searchMoviesSuccess = (data) => {
	return {
		type: actionTypes.SEARCH_MOVIES_SUCCESS,
		movies: data.Search,
		totalResults: data.totalResults
	};
};

export const searchMoviesFailed = (error) => {
	return {
		type: actionTypes.SEARCH_MOVIES_FAILED,
		error,
	};
};
