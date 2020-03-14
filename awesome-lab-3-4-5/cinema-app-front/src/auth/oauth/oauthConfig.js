export const oauthConfig ={
    vk:{
        URL: 'https://oauth.vk.com/authorize',
        redirectURL: 'http://localhost:3000/auth/vk',
        ID: '7340125',
    },
    fb:{
        ID:'513402312917888',
        redirectURL: 'http://localhost:3000/auth/facebook',
        URL: 'https://www.facebook.com/v6.0/dialog/oauth'
    },
    ya:{
        URL: 'https://oauth.yandex.ru/authorize',
        redirectURL: 'http://localhost:3000/auth/yandex',
        ID:'f78cfa214d384601beb42cded18e76d7',
    }
};
