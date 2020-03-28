const oauthAPiConfig = require("./oauthAPIConfig");
const axios = require('axios');

const YandexService = {
     getUserEmail: async (accessToken)=> {
        const tokenType = "Oauth";
         const response = await axios.get(oauthAPiConfig.ya.userDataURL, {
             headers:{
                 'Content-Type': 'application/json',
                 "Authorization": tokenType + " " + accessToken
             }
         });
        return response.data.emails[0];
    }
};

module.exports = YandexService;
