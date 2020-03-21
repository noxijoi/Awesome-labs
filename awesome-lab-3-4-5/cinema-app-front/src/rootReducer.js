import { combineReducers } from 'redux'
import authReducer from "./auth/authReducer";
import cinemaReducer from "./components/cinemas/cinemaReducer";
import movieReducer from "./components/movies/moviesReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    cinema: cinemaReducer,
    movie:movieReducer
});

export default rootReducer;
