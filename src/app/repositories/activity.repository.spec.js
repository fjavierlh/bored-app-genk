import axios from "axios";
import { ActivityRepository } from "./activity.repository";
import { RANDOM_ACTIVITY } from '../../../fixtures/random-activity.fixture';
jest.mock('axios');

describe("ActivityRepository", () => {
  
    beforeEach(() => {
    axios.mockClear();
  });

  it("Should return an object with a ramdom activity", async () => {

    axios.get = jest.fn().mockResolvedValue(RANDOM_ACTIVITY);

    const activityRepository = new ActivityRepository();
    const expectedObjectKeys = [
      "accessibility",
      "activity",
      "key",
      "link",
      "participants",
      "price",
      "type",
    ];
    const resultGet = await activityRepository.getRandomActivity();
    const resultObjectKeys = Object.keys(resultGet.data).sort();

    expect(resultObjectKeys).toEqual(expectedObjectKeys);
  });
});
