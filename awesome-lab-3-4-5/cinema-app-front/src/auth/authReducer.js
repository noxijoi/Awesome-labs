import {GUEST} from '../users/roles';
import {AUTH_ERROR, LOG_OUT} from "./oauth/actions";
import {RECEIVE_USER_DATA} from "./oauth/actions";

const initialState = {
    authorized: false,
    id: null,
    login: null,
    token: null,
    role: GUEST,
    tokenType: 'Bearer',

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_ERROR:{
            return {
                ...state,
                authorized: false,
            }
        }
        case RECEIVE_USER_DATA:{
            const userData = action.userData;
            return {
                ...state,
                authorized: true,
                id: userData._id,
                login: userData.login,
                token: userData.token,
                role: userData.role
            }
        }
        case LOG_OUT:{
            return initialState
        }
        default:
            return state;
    }
};

export default authReducer;
