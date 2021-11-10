import { DateTime } from "luxon";

export interface Price {
  readonly homePrice: number;
  readonly awayPrice: number;
  readonly timestamp: DateTime;
}

export interface Competitor {
  readonly id: number;
  readonly name: string;
}

export interface Fixture {
  readonly id: number;
  readonly name: string;
  readonly homeSide: Competitor;
  readonly awaySide: Competitor;
  currentPrices: Price;
}

export interface FixtureInfoUpdateDto {
  readonly fixtureDtos: ReadonlyArray<Fixture>;
}

export interface FixtureState {
  readonly fixtures: ReadonlyArray<Fixture>;
}
