import { FixtureInfoUpdateDto } from "./model";

export enum ActionTypes {
  FixtureInfoUpdated = "FixtureInfoUpdated",
  FixtureInfoConnected = "FixtureInfoConnected",
  FixtureInfoSubscribed = "FixtureInfoSubscribed",
  FixtureInfoUnsubscribed = "FixtureInfoUnsubscribed",
}

export const fixtureInfoUpdated = (update: FixtureInfoUpdateDto) => {
  return {
    type: ActionTypes.FixtureInfoUpdated as typeof ActionTypes.FixtureInfoUpdated,
    update,
  };
};

export const fixtureInfoConnected = () => {
  return {
    type: ActionTypes.FixtureInfoConnected as typeof ActionTypes.FixtureInfoConnected,
  };
};

export const fixtureInfoSubscribed = () => {
  return {
    type: ActionTypes.FixtureInfoSubscribed as typeof ActionTypes.FixtureInfoSubscribed,
  };
};

export const fixtureInfoUnsubscribed = () => {
  return {
    type: ActionTypes.FixtureInfoUnsubscribed as typeof ActionTypes.FixtureInfoUnsubscribed,
  };
};

export type AllActions =
  | ReturnType<typeof fixtureInfoUpdated>
  | ReturnType<typeof fixtureInfoConnected>
  | ReturnType<typeof fixtureInfoSubscribed>
  | ReturnType<typeof fixtureInfoUnsubscribed>;
