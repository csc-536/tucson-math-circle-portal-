import { Button, makeStyles } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import React, { useState } from "react";
import MeetingFields from "../components/MeetingFields";

const useStyles = makeStyles((theme) => ({
    root: {
        flexWrap: "wrap",
    },
    button: {
        marginTop: theme.spacing(3),
        float: "right",
    },
}));

const NewMeeting = () => {
    const classes = useStyles();

    const [form, setForm] = useState({
        date: new Date(),
        time: "",
        duration: "",
        topic: "",
        sessionLevel: "ja",
        material: "",
        zoomLink: "",
        miroLink: "",
        notes: "",
    });

    const handleNewMeeting = (e) => {
        e.preventDefault();
        console.log(form);

        // TODO: Validate inputs

        // TODO: submit form
    };

    return (
        <div>
            <h1>Create meeting</h1>
            <form
                className={classes.root}
                noValidate
                autoComplete="off"
                id="new-meeting-form"
                onSubmit={handleNewMeeting}
            >
                <MeetingFields form={form} setForm={setForm} />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    type="submit"
                    disableElevation
                >
                    Save
                </Button>
            </form>
        </div>
    );
};

export default NewMeeting;
