const User = require('./user.model');


const findAll = () => {
    return User.find();
};

function findOne(id) {
    return User.findById(id);
}

function findByLogin(login){
    return User.find()
        .where('login').equals(login)
}

function createUser(user) {
    const newUser = new User({...user});
    return newUser.save();
}

function updateUser(id, user) {
    return User.findByIdAndUpdate(id, user)
}

function deleteUser(id) {
    return User.findByIdAndRemove(id);
}

module.exports = {
    createUser: createUser,
    findOne: findOne,
    findByEmail: findByLogin,
    findAll: findAll,
    updateUser: updateUser,
    deleteUser: deleteUser
};
