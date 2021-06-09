import { ActivityService } from "./activity.service";
import { ActivityRepository } from '../repositories/activity.repository';
import { RANDOM_ACTIVITY } from "../../../fixtures/random-activity.fixture";
jest.mock('../repositories/activity.repository');

describe('ActivityService Test Suite', () => {
    
    beforeEach(() => {
        ActivityRepository.mockClear();
    });

    it('Should return a random activity', async () => {
        
        ActivityRepository.mockImplementation(() => {
            return {
                getRandomActivity: () => RANDOM_ACTIVITY
            }
        });
        
        const service = new ActivityService();

        const expectedObjectKeys = [

            "accessibility",
            "activity",
            "key",
            "link",
            "participants",
            "price",
            "type",
            
        ];

        const resultGetActivity = await service.getRandomActivity();
        const resultObjectKeys = Object.keys(resultGetActivity.data).sort();
    
        expect(resultObjectKeys).toEqual(expectedObjectKeys);

    });

});