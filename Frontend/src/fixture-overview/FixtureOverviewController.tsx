import * as React from "react";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import FixtureGrid, { Props } from "./fixture-grid/FixtureGrid";
import { StoreState } from "../store/configureStore";
import {
  fixtureInfoConnected,
  fixtureInfoSubscribed,
  fixtureInfoUnsubscribed,
  fixtureInfoUpdated,
} from "./actions";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { FixtureInfoUpdateDto } from "./model";

interface CallBacks {
  readonly onFixtureInfoUpdated: (fixture: FixtureInfoUpdateDto) => void;
  readonly onConnectedFixtureInfo: () => void;
  readonly onSubscribeFixtureInfo: () => void;
  readonly onUnsubscribeFixtureInfo: () => void;
}

type AllProps = Props & CallBacks;

const FixtureOverviewController: React.FC<AllProps> = (props: AllProps) => {
  const [connection, setConnection] = React.useState<any>(null);
  const { onUnsubscribeFixtureInfo, onConnectedFixtureInfo, onFixtureInfoUpdated } = props;
  // on mount
  React.useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/fixture-pricing-hub")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      onUnsubscribeFixtureInfo();
    };
  }, [onUnsubscribeFixtureInfo]);

  // start connection
  React.useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((_: any) => {
          // connect
          onConnectedFixtureInfo();

          // setup listner
          connection.on(
            "FixtureInfoUpdated",
            (message: FixtureInfoUpdateDto) => {
              onFixtureInfoUpdated(message);
            }
          );

          // subscribe
          connection.send("Subscribe");
        })
        .catch((e: any) => console.log("Connection failed: ", e));
    }
  }, [connection, onConnectedFixtureInfo, onFixtureInfoUpdated]);

  return <FixtureGrid {...props} />;
};

const mapStateToProps = (state: StoreState): Props => {
  return {
    fixtures: state.FixtureState.fixtures.filter((x) => x.name !== ""),
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, null, AnyAction>
): CallBacks => {
  return {
    onFixtureInfoUpdated: (update: FixtureInfoUpdateDto) =>
      dispatch(fixtureInfoUpdated(update)),
    onConnectedFixtureInfo: () => dispatch(fixtureInfoConnected()),
    onSubscribeFixtureInfo: () => dispatch(fixtureInfoSubscribed()),
    onUnsubscribeFixtureInfo: () => dispatch(fixtureInfoUnsubscribed()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FixtureOverviewController);
