export const USER_CREATED = 'users/user_CREATED';
export const RECEIVE_USERS_DATA ='users/RECEIVE_USERS_DATA';
export const RECEIVE_USER_DATA = 'users/RECEIVE_USER_DATA';

export const userCreated = (created) => {
    return {
        type: USER_CREATED,
        created: created
    }
};

export const receiveUsersData = (usersData) => {
    return {
        type: RECEIVE_USERS_DATA,
        usersData: usersData
    }
};

export const receiveUserData = (userData) =>{
    return{
        type: RECEIVE_USER_DATA,
        user: userData
    }
};