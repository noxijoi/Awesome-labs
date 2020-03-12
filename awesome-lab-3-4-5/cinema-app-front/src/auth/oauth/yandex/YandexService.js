import {yaConfig} from "./yandexAPIConfig";
import doRequest from "../../../Service";
import {API} from "../../../api";

class YandexService {
    async getUserData() {
        return await doRequest(yaConfig.requestUserDataURL);
    }
}

export default new YandexService();
