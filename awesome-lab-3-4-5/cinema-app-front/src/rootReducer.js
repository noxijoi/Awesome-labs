import { combineReducers } from 'redux'
import authReducer from "./auth/authReducer";
import cinemaReducer from "./components/cinemas/cinemaReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    cinema: cinemaReducer
});

export default rootReducer;
