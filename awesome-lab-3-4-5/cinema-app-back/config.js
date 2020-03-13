const appConfig = {
    db: {
        login:'root',
        password:'rootpassword',
        url:'mongodb://localhost:27017'
    },
    authenticationServices:{
        vk: 'vk',
        yandex: 'ya',
        facebook: 'fb'
    },
    auth:{
        privateKey: 'тыгыдыкский конь'
    }
};

module.exports = appConfig;
