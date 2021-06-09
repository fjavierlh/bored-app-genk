import { ActivityRepository } from '../repositories/activity.repository';

export class ActivityService {

    constructor() {
        this.repository = new ActivityRepository();
    }

    async getRandomActivity(formData = {}) {

        const URLparams = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value)
        );

        return await this.repository.getRandomActivity(URLparams);
        
    }

}