import { Box, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import MeetingCards from "../components/MeetingCards";
import { useHistory } from "react-router";
import { allMeetings } from "../http";

const Meetings = () => {
    const history = useHistory();

    if (sessionStorage.getItem("accessToken") === null) {
        history.push("/");
    }

    useEffect(() => {
        const meetings = async () => {
            try {
                const res = await allMeetings();
                console.log(res);
            } catch (error) {
                console.log(error.response);
            }
            console.log("dfadafs");
        };

        meetings();
    }, []);

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
