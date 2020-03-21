export const MOVIE_CREATED = 'movies/movie_CREATED';
export const RECEIVE_MOVIES_DATA ='movies/RECEIVE_MOVIES_DATA';
export const RECEIVE_MOVIE_DATA = 'movies/RECEIVE_MOVIE_DATA';

export const movieCreated = (created) => {
    return {
        type: MOVIE_CREATED,
        created: created
    }
};

export const receiveMoviesData = (moviesData) => {
    return {
        type: RECEIVE_MOVIES_DATA,
        moviesData: moviesData
    }
};

export const receiveMovieData = (movieData) =>{
    return{
        type: RECEIVE_MOVIE_DATA,
        movie: movieData
    }
};