import { Box, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import MeetingCards from "../components/MeetingCards";
import { useHistory } from "react-router";
import { allMeetings } from "../http";
import { AuthContext } from "../contexts/AuthContext";
import { partition } from "lodash";
import { meetingContext } from "../contexts/meetingContext";
import { Link } from "react-router-dom";
import { checkVerified } from "../utils";

const Meetings = () => {
  const history = useHistory();
  const [unverifiedStudents, setUnverifiedStudents] = useState([]);
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
        const [future, past] = partition(res.data, (e) => {
          return new Date(e.date_and_time) > new Date();
        });

        setFutureMeetings(future);
        setPastMeetings(past);
      } catch (error) {
        console.log(error.response);
      }
    };

    const getUnverifiedStudents = async () => {
      const s = await checkVerified();
      setUnverifiedStudents(s);
    };

    if (role === "student") {
      getUnverifiedStudents();
    }
    getMeetings();
  }, [filter]);

  const consentFormWarning = (
    <div>
      <br />
      <Alert severity="warning">
        <AlertTitle>
          <strong>Attention!!!</strong>
        </AlertTitle>
        {unverifiedStudents.map((name, i) =>
          i === unverifiedStudents.length - 1 ? `${name} ` : `${name}, `
        )}
        {unverifiedStudents.length > 1 ? "haven't" : "hasn't"} be verified yet.
        <br />
        If all consent forms are upload, please wait till coordinators verify
        them.
        <br />
        If you haven't done so, please submit through{" "}
        <Link to="/profile">Edit Profile</Link>.<br />
      </Alert>
      <br />
    </div>
  );

  const showConsentFormWarning =
    role === "student" && unverifiedStudents.length > 0;

  return (
    <div>
      {showConsentFormWarning ? consentFormWarning : ""}
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
