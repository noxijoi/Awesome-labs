const userService = require('./users/userService');
const methods = require('./methods');

module.exports = (app) => {
    // users
    app.post('/users', (req, res) => {
        let user = {
            login: req.body.login,
            password: req.body.password
        };
        userService.createUser(user)
            .then(res.render('ok', {message: "user created"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while creating the User."}));
    });
    app.get('/users', (req, res) => {
        userService.findAll()
            .then(usersData => {
                res.render('users', {users: usersData})
            }).catch(err => {
            res.render('error', {message: err.message || "Some error occurred while creating the User."});
        });
    });
    app.get('/newUser', (req, res) => {
        res.render('userForm', {formMethod: methods.POST})
    });
    app.get('/users/:userId', (req, res) => {
        userService.findOne(req.params.userId)
            .then(userData => res.render('userForm', {
                user: userData,
                method: methods.PUT
            }))
            .catch(err => {
                res.render('error', {err: err.message || "No such user."});
            });
    });
    app.put('/users/:userId', (req, res) => {
        let user = {
            login: req.body.login,
            password: req.body.password
        };
        userService.updateUser(req.params.userId, user)
            .then(res.render('ok', {message: "user updated"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while updating user."}));
    });
    app.delete('/users/:userId', (req, res) => {
        userService.deleteUser(req.params.userId)
            .then(res.render('ok', {message: "user deleted"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while deleting user."}));
    });
    //cinemas

    //movies
    //seances
};
