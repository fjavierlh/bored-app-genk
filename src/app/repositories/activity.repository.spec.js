import axios from "axios";
import { ActivityRepository } from "./activity.repository";
import { RANDOM_ACTIVITY } from '../../../fixtures/random-activity.fixture';
jest.mock('axios');

describe("ActivityRepository", () => {
  
    beforeEach(() => {

        axios.mockClear();

    });

    it("Should load an object with a ramdom activity from API", async () => {

        axios.get = jest.fn().mockResolvedValue(RANDOM_ACTIVITY);

        const activityRepository = new ActivityRepository();
        const expectedObjectKeys = [

            "accessibility",
            "activity",
            "key",
            "link",
            "participants",
            "price",
            "type"

        ].sort();

        const resultGetActivity = await activityRepository.getRandomActivity();
        const resultObjectKeys = Object.keys(resultGetActivity.data).sort();

        expect(resultObjectKeys).toEqual(expectedObjectKeys);

    });

});
