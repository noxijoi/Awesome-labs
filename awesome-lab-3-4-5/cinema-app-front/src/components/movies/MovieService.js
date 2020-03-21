import doRequest from "../../Service";
import {API} from "../../api";

class MovieService {
    async createMovie(movie) {
        return doRequest(API.MOVIES, {
            method: 'POST',
            body: JSON.stringify(movie)
        });
    }

    async getMovies() {
        return doRequest(API.MOVIES)
    }

    async getMovie(id) {
        return doRequest(API.MOVIES +'/' + id);
    }

    async updateMovie(movie, id){
        return doRequest(API.MOVIES + '/' +id, {
            method: 'PUT',
            body: JSON.stringify(movie)
        });
    }

}

export default new MovieService();
