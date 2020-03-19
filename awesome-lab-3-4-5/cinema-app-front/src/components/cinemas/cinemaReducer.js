import {CINEMA_CREATED, RECEIVE_CINEMA_DATA, RECEIVE_CINEMAS_DATA} from "./actions";

const initialState = {
    created: false,
    cinemasData: [],
    cinema:{}
};

const cinemaReducer = (state = initialState, action) => {
    switch (action.type) {
        case CINEMA_CREATED:
            return {
                ...state,
                created: action.created
            };
        case RECEIVE_CINEMAS_DATA:
            return {
                ...state,
                cinemasData: action.cinemasData.cinemas
            };
        case RECEIVE_CINEMA_DATA:
            return {
                ...state,
                cinema: action.cinema
            };
        default:
            return state;
    }
};

export default cinemaReducer;
