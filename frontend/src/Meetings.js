import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import MeetingCards from "./components/MeetingCards";

const Meetings = () => {
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                disableElevation
                float="right"
            >
                Edit My Profile
            </Button>

            <Box mb={3}>
                <Typography variant="h4">Upcoming Meetings</Typography>
                <MeetingCards />
            </Box>
            <Box mb={3}>
                <Typography variant="h4">Past Meetings</Typography>
                <MeetingCards />
            </Box>
        </div>
    );
};

export default Meetings;
