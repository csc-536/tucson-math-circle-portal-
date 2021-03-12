import { Box, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import MeetingCards from "../components/MeetingCards";
import { useHistory } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const Meetings = () => {
    const history = useHistory();
    const { setAuth } = useContext(AuthContext);

    if (sessionStorage.getItem("accessToken") === null) {
        history.push("/");
    }

    function handleLogout(e) {
        sessionStorage.removeItem("accessToken");
        setAuth({ userLoggedIn: false, role: "" });
        history.push("/");
    }

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                disableElevation
                float="right"
                style={{ float: "right" }}
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
