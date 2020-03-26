const oauthAPiConfig = require("./oauthAPIConfig");
const axios = require('axios');

const GoogleService = {
    getUserEmail: async (code) => {
        const tokenResponse = await axios.post();
        const config = oauthAPiConfig.google;
        const token = await axios.get(config.tokenURL, {
            code: code,
            client_id: config.client_id,
            client_secret: config.client_secret,
            redirect_uri: config.redirect_uri,
            grant_type: 'authorization_code'
        });
        const userInfo = await this.getUserInfo(token.access_token);
        return userInfo;
    },

    getUserInfo: async (accessToken) => {
        const config = oauthAPiConfig.google;
        const response = await axios.get(config.emailGoogleApi, {
                params: {accessToken: accessToken}
            }
        );
        return response;
    }

};
module.exports = GoogleService;
