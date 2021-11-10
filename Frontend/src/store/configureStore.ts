import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { FixtureState } from "../fixture-overview/model";
import { fixtureReducer } from "../fixture-overview/reducer";

export interface StoreState {
  readonly FixtureState: FixtureState;
}

const configureStore = (preloadedState?: StoreState) => {
  const rootReducer = combineReducers<StoreState>({
    FixtureState: fixtureReducer,
  });

  const composeEnhancers =
    // eslint-disable-next-line
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

export default configureStore;
