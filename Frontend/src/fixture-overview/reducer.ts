import {
  AllActions as FixtureActions,
  ActionTypes as FixtureActionTypes,
} from "./actions";
import { Fixture, FixtureState } from "./model";

export const getDefaultFixtureState = (): FixtureState => {
  return {
    fixtures: [],
  };
};

export const fixtureReducer = (
  state: FixtureState = getDefaultFixtureState(),
  action: FixtureActions
): FixtureState => {
  switch (action.type) {
    case FixtureActionTypes.FixtureInfoUpdated: {
      const update = action.update.fixtureDtos[0];
      if (update) {
        const fixtures: Array<Fixture> = JSON.parse(JSON.stringify(state.fixtures));
        const exist = fixtures.find(f => f.id === update.id);
        if (exist) {
          exist.currentPrices = { ...update.currentPrices };
        } else {
          fixtures.push(update);
        }

        return { ...state, fixtures: fixtures.sort((a, b) => a.id - b.id) };
      }
      return { ...state };
    }
    default:
      return state;
  }
};
