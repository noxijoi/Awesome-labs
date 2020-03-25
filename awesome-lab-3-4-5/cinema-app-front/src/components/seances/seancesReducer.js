import {SEANCE_CREATED, RECEIVE_SEANCE_DATA, RECEIVE_SEANCES_DATA} from "./seanceActions";

const initialState = {
    created: false,
    seancesData: [],
    seance:{}
};

const seanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEANCE_CREATED:
            return {
                ...state,
                created: action.created
            };
        case RECEIVE_SEANCES_DATA:
            return {
                ...state,
                seancesData: action.seancesData
            };
        case RECEIVE_SEANCE_DATA:
            return {
                ...state,
                seance: action.seance
            };
        default:
            return state;
    }
};

export default seanceReducer;
