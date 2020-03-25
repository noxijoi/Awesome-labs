export const oauthConfig = {
    vk: {
        URL: 'https://oauth.vk.com/authorize',
        redirectURL: 'http://localhost:3000/auth/vk',
        ID: '7340125',
    },
    fb: {
        ID: '513402312917888',
        redirectURL: 'http://localhost:3000/auth/facebook',
        URL: 'https://www.facebook.com/v6.0/dialog/oauth'
    },
    ya: {
        url: 'https://oauth.yandex.ru/authorize',
        params: {
            'response_type': 'token',
            'redirect_uri': 'http://localhost:3000/auth/yandex',
            'client_id': 'f78cfa214d384601beb42cded18e76d7',
        }
    },
    google: {
        url:"",
        params: {
            'client_id': '836613618566-5p8injl5mstqtst4hnu2933t2gfnvhn9.apps.googleusercontent.com',
            'redirect_uri': 'http://localhost:3000/auth/google',
            'response_type': 'code',
            'scope': 'email profile',
            'access_type': 'offline',
            'prompt': 'select_account',
        }
    }
};
