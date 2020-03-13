const userService = require('./userService');
const auth = require('../auth/auth');
const appConfig = require('../config');
const express = require("express");
const YandexService = require("../auth/YandexService");
const router = express.Router();

router.post('/login', async (req, res) => {
    const accessToken = req.body.accessToken;
    const accessService = req.body.service;
    let login = "";
    switch (accessService) {
        case appConfig.authenticationServices.yandex:
            login = await YandexService.getUserEmail(accessToken);
            break;
        case appConfig.authenticationServices.facebook:
            break;
        case appConfig.authenticationServices.vk:
            break;
        default:
            res.status(400).send("Unknown authentication service");
    }
    const existing = await userService.findByEmail(login);
    let user = {};
    if (existing.length === 0) {
        let newUser = {
            login: login,
            serviceAccessToken: accessToken,
            authorizationService: accessService,
            role: 'user'
        };
        user = await userService.createUser(newUser);
    } else {
        user = existing[0];
    }
    const token = user.generateAuthToken();
    res.send({
        _id: user._id,
        login: user.login,
        role: user.role,
        token: token
    })
});

router.get('/', auth, async (req, res) => {
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
