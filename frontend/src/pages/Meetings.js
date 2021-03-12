import { Box, Typography } from "@material-ui/core";
import React from "react";
import MeetingCards from "../components/MeetingCards";
import { useHistory } from "react-router";

const Meetings = () => {
    const history = useHistory();

    if (sessionStorage.getItem("accessToken") === null) {
        history.push("/");
    }

    return (
        <div>
            <Box mb={3}>
                <Typography variant="h4">Upcoming Meetings</Typography>
                <MeetingCards past={false} />
            </Box>
            <Box mb={3}>
                <Typography variant="h4">Past Meetings</Typography>
                <MeetingCards past={true} />
            </Box>
        </div>
    );
};

export default Meetings;
