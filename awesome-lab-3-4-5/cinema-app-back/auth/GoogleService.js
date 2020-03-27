const oauthAPiConfig = require("./oauthAPIConfig");
const axios = require('axios');

const GoogleService = {
    getUserEmail: async (code) => {
        const config = oauthAPiConfig.google;

        try {
            const token = await axios.post(config.tokenURL, {
                code: code,
                client_id: config.client_id,
                client_secret: config.client_secret,
                redirect_uri: config.redirect_uri,
                grant_type: 'authorization_code'
            });
            const userInfo = await getUserInfo(token.data.access_token);
            return userInfo.email;
        } catch (e) {
            return e
        }
    },

};

const  getUserInfo = async  (accessToken) => {
    const config = oauthAPiConfig.google;
    const response = await axios.get(config.emailGoogleApi, {
            params: {accessToken: accessToken},
        headers: {Authorization: `Bearer ${accessToken}`}
        }
    );
    return response.data;
};
module.exports = GoogleService;
