import {API} from "../api";
import doRequest from "../Service";

class UserService {
    async login(accessToken, service){
        return doRequest(API.LOG_IN,{method: 'POST',
        body:{
            accessToken: accessToken,
            service: service
        }} )
    }

}
export default new UserService();
