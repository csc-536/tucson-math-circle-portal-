import { Box, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import MeetingCards from "../components/MeetingCards";
import { useHistory } from "react-router";
import { allMeetings } from "../http";
import { AuthContext } from "../contexts/AuthContext";
import { partition } from "lodash";

const Meetings = () => {
  const history = useHistory();
  const [pastMeetings, setPastMeetings] = useState([]);
  const [futureMeetings, setFutureMeetings] = useState([]);
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

    meetings();
  }, []);

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
