import {USER_CREATED, RECEIVE_USER_DATA, RECEIVE_USERS_DATA} from "./userActions";

const initialState = {
    created: false,
    usersData: [],
    user:{}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_CREATED:
            return {
                ...state,
                created: action.created
            };
        case RECEIVE_USERS_DATA:
            return {
                ...state,
                usersData: action.usersData
            };
        case RECEIVE_USER_DATA:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
};

export default userReducer;
