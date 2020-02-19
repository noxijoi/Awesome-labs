const userService = require('./users/userService');

module.exports = (app) => {

    // Create a new Note
    app.post('/users', (req, res) => {
        //userService.createUser();
    });

    app.get('/users', (req, res) => {
        userService.findAll()
            .then(usersData => {
                res.render('users', {users: usersData})
            }).catch(err => {
            res.render('error', {err: err.message || "Some error occurred while creating the User."});
        });
    });
    app.get('/newUser', (req, res) => {
        res.render('userForm')
    });
    app.get('/users/:userId', (req, res) => {
        userService.findOne(req.params.userId)
            .then(userData => res.render('userForm', {user: userData}))
            .catch(err => {
                res.render('error', {err: err.message || "No such user."});
            });
    });

    app.put('/users/:userId', userService.updateUser);

    app.delete('/users/:userId', userService.deleteUser);
};
