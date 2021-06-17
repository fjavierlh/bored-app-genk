import axios from "axios";

export class ActivityRepository {
  constructor() {
    this.defaultParams = {
      minprice: 0,
      minaccessibility: 0,
    };

    this.API_URL = new URL("http://www.boredapi.com/api/activity/");
  }

  async getRandomActivity(URLParams) {
    const allParams = { ...URLParams, ...this.defaultParams };
    this.API_URL.search = new URLSearchParams(allParams);
    return await axios.get(this.API_URL.toString());
  }
}
