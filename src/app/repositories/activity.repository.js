import axios from "axios";

export class ActivityRepository {

    constructor() {

        this.API_URL = new URL('http://www.boredapi.com/api/activity/');
    
    }

    async getRandomActivity(URLParams) {

        this.API_URL.search = new URLSearchParams(URLParams);
        
        return await axios.get(this.API_URL.toString());

    }

}