import React from "react";
import { makeStyles } from "@mui/styles";
import { Fixture } from "../model";
import { Card, Grid, Typography } from "@mui/material";

const useStyles = makeStyles({
  card: {
    height: "100%",
    width: "100%",
  },
});
export interface Props {
  readonly fixture: Fixture;
}

const PriceTile: React.FC<{ price: number }> = ({ price }) => {
  return <div>
    {price}
  </div>;
};

const FixtureTile: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Typography>{props.fixture.id}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <h6>Home </h6>
          <PriceTile price={props.fixture.currentPrices.homePrice} />
        </Grid>
        <Grid item xs={2}>
          <h6>Away</h6>
          <PriceTile price={props.fixture.currentPrices.awayPrice} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default FixtureTile;
