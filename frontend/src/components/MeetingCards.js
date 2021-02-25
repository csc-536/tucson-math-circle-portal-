import React from "react";
import MeetingCard from "./MeetingCard";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { chunk } from "lodash";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const MeetingCards = ({ meetings = [1, 2, 3, 4, 6, 7] }) => {
    const classes = useStyles();
    const numItemPerRow = 4;

    const chunks = chunk(meetings, numItemPerRow);

    const grid = chunks.map((c) => (
        <Grid container item md={12} spacing={3}>
            {c.map((cc) => (
                <Grid item md={12 / numItemPerRow}>
                    <MeetingCard />
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
