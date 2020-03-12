const userService = require('./userService');
module.exports = (app) => {
    app.post('/api/users', (req, res) => {
        let user = {
            login: req.body.login,
            password: req.body.password
        };
        userService.createUser(user)
            .then(res.status(200).json())
            .catch(err => res.send({error: err.message || "Some error occurred while creating the User."}));
    });
    app.get('/api/users', (req, res) => {
        userService.findAll()
            .then(usersData => {
                res.send({users: usersData})
            }).catch(err => {
            res.send({error: err.message || "Some error occurred while getting the User."});
        });
    });
    app.get('/api/users/:userId', (req, res) => {
        userService.findOne(req.params.userId)
            .then(userData => res.send({
                user: userData,
            }))
            .catch(err => {
                res.send({error: err.message || "No such user."});
            });
    });
    app.post('/api/users/:userId', (req, res) => {
        let user = {
            login: req.body.login,
            password: req.body.password
        };
        userService.updateUser(req.params.userId, user)
            .then(res.status(200).json())
            .catch(err => res.send({error: err.message || "Some error occurred while updating user."}));
    });
    app.get('/api/users/del/:userId', (req, res) => {
        userService.deleteUser(req.params.userId)
            .then(res.status(200).json())
            .catch(err => res.send({error: err.message || "Some error occurred while deleting user."}));
    });
};
