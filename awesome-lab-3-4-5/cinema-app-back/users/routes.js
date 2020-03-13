const userService = require('./userService');
const auth = require('../auth/auth');
const express = require("express");
const router = express.Router();


router.post('/', async (req, res) => {
    let user = {
        login: req.body.login,
        password: req.body.password
    };
    userService.createUser(user)
        .then(res.status(200).json())
        .catch(err => res.send({error: err.message || "Some error occurred while creating the User."}));
});
router.get('/', async (req, res) => {
    userService.findAll()
        .then(usersData => {
            res.send({users: usersData})
        }).catch(err => {
        res.send({error: err.message || "Some error occurred while getting the User."});
    });
});
router.get('/:userId', async (req, res) => {
    userService.findOne(req.params.userId)
        .then(userData => res.send({
            user: userData,
        }))
        .catch(err => {
            res.send({error: err.message || "No such user."});
        });
});
router.put('/:userId', async (req, res) => {
    let user = {
        login: req.body.login,
        password: req.body.password
    };
    userService.updateUser(req.params.userId, user)
        .then(res.status(200).json())
        .catch(err => res.send({error: err.message || "Some error occurred while updating user."}));
});
router.delete('/:userId', async (req, res) => {
    userService.deleteUser(req.params.userId)
        .then(res.status(200).json())
        .catch(err => res.send({error: err.message || "Some error occurred while deleting user."}));
});

module.exports = router;
