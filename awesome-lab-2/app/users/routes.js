const userService = require('./userService');
module.exports = (app) => {
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
    app.get('/users/newUser', (req, res) => {
        res.render('userForm')
    });
    app.get('/users/:userId', (req, res) => {
        userService.findOne(req.params.userId)
            .then(userData => res.render('userForm', {
                user: userData,
            }))
            .catch(err => {
                res.render('error', {err: err.message || "No such user."});
            });
    });
    app.post('/users/:userId', (req, res) => {
        let user = {
            login: req.body.login,
            password: req.body.password
        };
        userService.updateUser(req.params.userId, user)
            .then(res.render('ok', {message: "user updated"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while updating user."}));
    });
    app.get('/users/del/:userId', (req, res) => {
        userService.deleteUser(req.params.userId)
            .then(res.render('ok', {message: "user deleted"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while deleting user."}));
    });
};
