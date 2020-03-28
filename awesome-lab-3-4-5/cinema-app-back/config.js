const appConfig = {
    db: {
        login:'root',
        password:'rootpassword',
        url:'mongodb://mongodb:27017'
    },
    authenticationServices:{
        vk: 'vk',
        yandex: 'yandex',
        facebook: 'facebook',
        google: 'google'
    },
    auth:{
        privateKey: 'тыгыдыкский конь'
    }
};

module.exports = appConfig;
