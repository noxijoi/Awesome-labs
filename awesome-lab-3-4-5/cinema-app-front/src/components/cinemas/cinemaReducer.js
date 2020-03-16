import {CINEMA_CREATED} from "./actions";

const initialState ={
  created: false
};

const cinemaReducer = (state = initialState, action) =>{
    switch (action.type) {
        case CINEMA_CREATED:
            return {
                ...state,
                created: action.created
            };
        default:
            return state;
    }
};

export default cinemaReducer;
