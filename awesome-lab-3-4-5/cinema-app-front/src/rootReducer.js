import { combineReducers } from 'redux'
import authReducer from "./auth/authReducer";
import cinemaReducer from "./components/cinemas/cinemaReducer";
import movieReducer from "./components/movies/moviesReducer";
import seanceReducer from "./components/seances/seancesReducer";
import userReducer from "./components/users/usersReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    cinema: cinemaReducer,
    movie:movieReducer,
    seance: seanceReducer,
    user: userReducer
});

export default rootReducer;
