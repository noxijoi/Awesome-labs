import {API} from "../api";
import doRequest from "../Service";

class UserService {
    async login(login){
        return doRequest(API.LOG_IN,{method: 'POST'} )
    }
}
