const User = require('./user.model');


const findAll = () =>{
    return User.find();
};



function findOne(id) {
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
    findOne: findOne,
    findAll: findAll,
    updateUser: updateUser,
    deleteUser: deleteUser
};
