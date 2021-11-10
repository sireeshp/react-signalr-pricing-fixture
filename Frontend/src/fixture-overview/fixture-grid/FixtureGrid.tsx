import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import FixtureTile from "../fixture-tile/FixtureTile";
import { Fixture } from "../model";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  margin: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export interface Props {
  readonly fixtures: ReadonlyArray<Fixture>;
}

const FixtureGrid: React.FC<Props> = (props: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, sm: 2, md: 1, lg: 1 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
      >
        {props.fixtures.map((fixture, index) => (
          <Grid item xs={2} sm={4} md={2} lg={1} key={index}>
            <Item>
              <FixtureTile fixture={fixture} />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FixtureGrid;
