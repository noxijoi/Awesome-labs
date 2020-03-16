import doRequest from "../../Service";
import {API} from "../../api";

class CinemaService {
    async createCinema(cinema) {
        return doRequest(API.CINEMAS, {
            method: 'POST',
            body: JSON.stringify(cinema)
        })
    }
}

export default new CinemaService();
