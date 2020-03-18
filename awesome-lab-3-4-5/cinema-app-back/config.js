const appConfig = {
    db: {
        login:'root',
        password:'rootpassword',
        url:'mongodb://localhost:27018'
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
