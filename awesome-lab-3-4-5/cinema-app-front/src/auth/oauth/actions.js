export const AUTH_ERROR = 'oauth/AUTH_ERROR';
export const RECEIVE_TOKEN = 'oauth/RECEIVE_TOKEN';
export const RECEIVE_USER_DATA = 'oauth/AUTH_ERROR';
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

export const receiveToken = (token, service) => {
    return {
        type: RECEIVE_TOKEN,
        token: token,
        service: service
    }
};

export const logout = () => {
    return {
        type: LOG_OUT
    }
};

