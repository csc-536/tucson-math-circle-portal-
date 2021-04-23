import { Box, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import MeetingCards from "../components/MeetingCards";
import { useHistory } from "react-router";
import { allMeetings, profile } from "../http";
import { AuthContext } from "../contexts/AuthContext";
import { partition } from "lodash";
import { meetingContext } from "../contexts/meetingContext";

const Meetings = () => {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [pastMeetings, setPastMeetings] = useState([]);
    const [futureMeetings, setFutureMeetings] = useState([]);
    if (sessionStorage.getItem("accessToken") === null) {
        history.push("/");
    }

    const {
        auth: { role },
    } = useContext(AuthContext);

    const { filter } = useContext(meetingContext);

    useEffect(() => {
        const getMeetings = async () => {
            try {
                const res = await allMeetings({ role, body: filter });
                // setMeetings(res.data);
                // console.log(res.data);
                const [future, past] = partition(res.data, (e) => {
                    return new Date(e.date_and_time) > new Date();
                });

                setFutureMeetings(future);
                setPastMeetings(past);
            } catch (error) {
                console.log(error.response);
            }
        };

        const getUser = async () => {
            try {
                const { data } = await profile();
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (role === "student") {
            getUser();
        }
        getMeetings();
    }, [filter]);

    return (
        <div>
            <Box mb={3}>
                <Typography variant="h4">Upcoming Meetings</Typography>
                <MeetingCards past={false} meetings={futureMeetings} />
            </Box>
            <Box mb={3}>
                <Typography variant="h4">Past Meetings</Typography>
                <MeetingCards past={true} meetings={pastMeetings} />
            </Box>
        </div>
    );
};

export default Meetings;
