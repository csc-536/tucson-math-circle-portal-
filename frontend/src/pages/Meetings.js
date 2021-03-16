import { Box, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import MeetingCards from "../components/MeetingCards";
import { useHistory } from "react-router";
import { allMeetings } from "../http";
import { AuthContext } from "../contexts/AuthContext";

const Meetings = () => {
    const history = useHistory();
    const [meetings, setMeetings] = useState([]);
    if (sessionStorage.getItem("accessToken") === null) {
        history.push("/");
    }

    const {
        auth: { role },
    } = useContext(AuthContext);

    useEffect(() => {
        const meetings = async () => {
            try {
                const body = {
                    session_levels: ["junior_a", "junior_b", "senior"],
                    dates: ["2021-03-15"],
                };
                const res = await allMeetings({ role, body });
                setMeetings(res.data);
            } catch (error) {
                console.log(error.response);
            }
            console.log("dfadafs");
        };

        meetings();
    }, []);

    console.log(meetings);

    return (
        <div>
            <Box mb={3}>
                <Typography variant="h4">Upcoming Meetings</Typography>
                <MeetingCards past={false} meetings={meetings} />
            </Box>
            <Box mb={3}>
                <Typography variant="h4">Past Meetings</Typography>
                <MeetingCards past={true} meetings={meetings} />
            </Box>
        </div>
    );
};

export default Meetings;
