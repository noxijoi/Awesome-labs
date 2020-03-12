import {yaConfig} from "./yandexAPIConfig";
import doRequest from "../../../Service";

class YandexService {
    async getUserData() {
        return doRequest(yaConfig.requestUserDataURL )
    }
}

export default new YandexService();
