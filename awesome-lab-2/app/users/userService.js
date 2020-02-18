


function getAllUsers(db) {
    return [{
        id: 1,
        login: 'login',
        password: 'password'
    }, {
        id: 2,
        login: 'login2',
        password: 'password2'
    }, {
        id: 3,
        login: 'login3',
        password: 'password3'
    }, {
        id: 4,
        login: 'login4',
        password: 'password4'
    }]

}

function getUser(db, id) {
    return {
        id: 1,
        login: 'login',
        password: 'password'
    }
}

function createUser(db, user) {

}

function updateUser(db, user) {

}

function deleteUser(db, id) {

}

module.exports = {
    createUser: createUser,
    getUser: getUser,
    getAllUsers: getAllUsers,
    updateUser: updateUser,
    deleteUser: deleteUser
};
