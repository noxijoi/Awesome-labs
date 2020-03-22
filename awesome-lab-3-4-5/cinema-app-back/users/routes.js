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
    const users = await userService.findAll();
    res.send(users);
});

router.get('/:userId', async (req, res) => {
    const user = await userService.findOne(req.params.userId);
    res.send(user);
});

router.put('/:userId', async (req, res) => {
    let user = {
        login: req.body.login,
        password: req.body.password
    };
    const updated = await userService.updateUser(req.params.userId, user);
    res.send(updated);
    });

router.delete('/:userId', async (req, res) => {
    const deleted = await userService.deleteUser(req.params.userId);
    res.send(deleted);
});

module.exports = router;
