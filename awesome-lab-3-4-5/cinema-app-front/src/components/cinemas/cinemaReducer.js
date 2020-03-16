import {CINEMA_CREATED, RECEIVE_CINEMAS_DATA} from "./actions";

const initialState = {
    created: false,
    cinemasData: []
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
        default:
            return state;
    }
};

export default cinemaReducer;
