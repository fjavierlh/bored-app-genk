import axios from "axios";

export class ActivityRepository {

    constructor() {
        this.API_URL = 'http://www.boredapi.com/api/activity/';
    }

    getRandomActivity = async () => await axios.get(this.API_URL);

}