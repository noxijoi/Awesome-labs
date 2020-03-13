const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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

UserSchema.methods.generateAuthToken = () => {
    return jwt.sign({_id: this._id, role: this.role}, appConfig.auth.privateKey);
};

module.exports = mongoose.model('User', UserSchema);
