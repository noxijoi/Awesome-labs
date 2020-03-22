import {API} from "../../api";
import doRequest from "../../Service";

class UserService {
    async login(accessToken, service) {
        return doRequest(API.LOG_IN, {
            method: 'POST',
            body: JSON.stringify({
                accessToken: accessToken,
                service: service
            })
        })
    }

    async getUsers() {
        return doRequest(API.USERS)
    }

    async getMovie(id) {
        return doRequest(API.USERS +'/' + id);
    }

    async updateMovie(user, id){
        return doRequest(API.USERS + '/' +id, {
            method: 'PUT',
            body: JSON.stringify(user)
        });
    }

}

export default new UserService();
