import doRequest from "../../Service";
import {API} from "../../api";

class SeanceService {
    async createSeance(seance) {
        return doRequest(API.SEANCES, {
            method: 'POST',
            body: JSON.stringify(seance)
        });
    }

    async getSeances() {
        return doRequest(API.SEANCES)
    }

    async getSeance(id) {
        return doRequest(API.SEANCES +'/' + id);
    }

    async updateSeance(seance, id){
        return doRequest(API.SEANCES + '/' +id, {
            method: 'PUT',
            body: JSON.stringify(seance)
        });
    }

}

export default new SeanceService();
