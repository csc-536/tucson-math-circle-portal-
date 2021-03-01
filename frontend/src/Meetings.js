import { Box, Typography } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import MeetingCards from "./components/MeetingCards";
import { useHistory } from "react-router";

const Meetings = () => {
  const history = useHistory();

  function handleEditMyProfile(e) {
    history.push("/profile");
  }
  
  function handleLogout(e) {
    history.push("/");
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        float="right"
        onClick={handleEditMyProfile}
      >
        Edit My Profile
      </Button>

      <Button
        variant="contained"
        color="primary"
        disableElevation
        float="right"
        style={{float: "right"}}
        onClick={handleLogout}
      >
        Logout
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
