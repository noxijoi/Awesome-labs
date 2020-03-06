const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const appConfig = require('../config');

const UserSchema = mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        enum: ['W', 'M']
    },
    email: {
        type: String
    },
    accessToken: {
        type: String
    },
    authorizationService: {
        type: String,
        enum: [appConfig.authenticationServices.facebook,
            appConfig.authenticationServices.vk,
            appConfig.authenticationServices.yandex],
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        default: 'user'
    },

});

module.exports = mongoose.model('User', UserSchema);
