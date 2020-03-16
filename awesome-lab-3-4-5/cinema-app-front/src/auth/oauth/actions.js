export const AUTH_ERROR = 'oauth/AUTH_ERROR';
export const RECEIVE_USER_DATA = 'oauth/RECEIVE_USER_DATA';
export const LOG_OUT = 'oauth/LOG_OUT';

export const authError = (errDesc) => {
    return {
        type: AUTH_ERROR,
        errDesc: errDesc
    }
};

export const receiveUserData = (userData) => {
    return {
        type: RECEIVE_USER_DATA,
        userData: userData
    }
};



export const logout = () => {
    return {
        type: LOG_OUT
    }
};

