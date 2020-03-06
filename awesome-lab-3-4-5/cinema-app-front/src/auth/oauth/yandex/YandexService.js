import {yaConfig} from "./yandexAPIConfig";
import request from "../../../Service";

class YandexService {
    async getUserData() {
        return request(yaConfig.requestUserDataURL )
    }
}

export default new YandexService();
