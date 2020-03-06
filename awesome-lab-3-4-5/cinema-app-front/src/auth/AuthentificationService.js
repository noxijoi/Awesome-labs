import oauthConfig from '../auth/oauth/oauthConfig';
import vkConfig from '../auth/oauth/vk/vkAPIConfig';
import fbConfig from '../auth/oauth/facebook/facebookAPIConfig';
import yaConfig from  '../auth/oauth/yandex/yandexAPIConfig';

class AuthentificationService {
    async auth(service){
        switch (service) {
            case oauthConfig.services.yandex:
            case oauthConfig.services.fb:
            case oauthConfig.services.vk:
        }
        return
    }
}