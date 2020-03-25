const oauthAPiConfig ={
    ya:{
        userDataURL:'https://login.yandex.ru/info'
    },
    fb:{

    },
    vk:{

    },
    google: {
        tokenURL: 'https://www.googleapis.com/oauth2/v4/token',
        client_id: '836613618566-5p8injl5mstqtst4hnu2933t2gfnvhn9.apps.googleusercontent.com',
        client_secret: 'jCXbI2eYCRp5cPb_GUa3kezy',
        redirect_uri: 'http://localhost:3000/oauth2callback',
        grant_type: 'authorization_code'
    }
};

module.exports = oauthAPiConfig;
