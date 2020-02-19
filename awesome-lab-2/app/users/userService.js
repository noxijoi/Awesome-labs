const User = require('./user.model');


const findAll = (req, res) =>{
    User.find()
        .then(
            data =>{
                res.render('users', {users:data})
            }
        ).catch(err =>{
            res.status(500).send({message: err.message || "Some error occurred while creating the User."})
    })
};



function findOne(db, id) {
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
