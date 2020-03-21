import {MOVIE_CREATED, RECEIVE_MOVIE_DATA, RECEIVE_MOVIES_DATA} from "./movieActions";

const initialState = {
    created: false,
    moviesData: [],
    movie:{}
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_CREATED:
            return {
                ...state,
                created: action.created
            };
        case RECEIVE_MOVIES_DATA:
            return {
                ...state,
                moviesData: action.moviesData.movies
            };
        case RECEIVE_MOVIE_DATA:
            return {
                ...state,
                movie: action.movie
            };
        default:
            return state;
    }
};

export default movieReducer;
