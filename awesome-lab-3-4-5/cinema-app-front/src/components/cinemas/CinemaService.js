import doRequest from "../../Service";
import {API} from "../../api";

class CinemaService {
    async createCinema(cinema) {
        return doRequest(API.CINEMAS, {
            method: 'POST',
            body: JSON.stringify(cinema)
        })
    }

    async getCinemas() {
        return doRequest(API.CINEMAS)
    }
}

export default new CinemaService();
