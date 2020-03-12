import {GUEST} from '../users/roles';
import {AUTH_ERROR, LOG_OUT} from "./oauth/actions";
import {RECEIVE_TOKEN} from "./oauth/actions";
import {RECEIVE_USER_DATA} from "./oauth/actions";

const initialState = {
    authorized: false,
    user: {
        id: null,
        role: GUEST
    },
    token: {
        value:'',
        service:''
    },
    userData:{
    },
    tokenType: 'OAuth'
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_ERROR:{
            return {
                ...state,
                authorized: false,
            }
        }
        case RECEIVE_TOKEN:{
            return {
                ...state,
                token:{
                    value: action.token,
                    service: action.service
                }
            }
        }
        case RECEIVE_USER_DATA:{
            return {
                ... state,
                userData: action.userData
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
