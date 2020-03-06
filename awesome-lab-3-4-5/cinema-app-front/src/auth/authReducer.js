import {GUEST} from '../users/roles';

const initialState = {
    authorized: false,
    user: {
        id: null,
        role: GUEST
    },
    token: {
        yaToken: null,
        vkToken: null,
        fbToken: null
    },
    tokenType: '',
    tokenService: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default authReducer;