import { ActivityRepository } from '../repositories/activity.repository';

export class ActivityService {

    constructor() {
        this.repository = new ActivityRepository();
    }

    async getRandomActivity(URLParams) {

        return await this.repository.getRandomActivity(URLParams);
        
    }

}