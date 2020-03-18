import doRequest from "../../Service";
import {API} from "../../api";

class CinemaService {
    async createCinema(cinema) {
        return doRequest(API.CINEMAS, {
            method: 'POST',
            body: JSON.stringify(cinema)
        });
    }

    async getCinemas() {
        return doRequest(API.CINEMAS)
    }

    async getCinema(id) {
        return doRequest(API.CINEMAS +'/' + id);
    }

    async updateCinema(cinema, id){
        return doRequest(API.CINEMAS + '/' +id, {
            method: 'PUT',
            body: JSON.stringify(cinema)
        });
    }

}

export default new CinemaService();
