import React from "react";
import MeetingCard from "./MeetingCard";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { chunk, uniqueId } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const MeetingCards = ({ past }) => {
  const classes = useStyles();
  const numItemPerRow = 4;

  const meetings = [1, 2, 3, 4, 6, 7];

  const chunks = chunk(meetings, numItemPerRow);

  const grid = chunks.map((c) => (
    <Grid container item md={12} spacing={3} key={uniqueId()}>
      {c.map((cc) => (
        <Grid item md={12 / numItemPerRow} key={uniqueId()}>
          <MeetingCard meeting={cc} past={past} />
        </Grid>
      ))}
    </Grid>
  ));

  return (
    <div className={classes.root} variant="outlined">
      {grid}
    </div>
  );
};

export default MeetingCards;
