import { Button, makeStyles } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import React, { useState } from "react";
import MeetingFields from "../components/MeetingFields";
import { addMeeting } from "../http";

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
    sessionLevel: "",
    material: "",
    zoomLink: "",
    miroLink: "",
    notes: "",
  });

  const handleNewMeeting = async (e) => {
    e.preventDefault();
    console.log(form);
    const { zoomLink, sessionLevel, topic, material, miroLink } = form;
    try {
      const res = await addMeeting({
        meeting_date: "2021-03-12",
        meeting_time: "2021-03-12T18:46:34.851Z",
        zoom_link: zoomLink,
        session_level: sessionLevel,
        topic,
        miro_link: miroLink,
        meeting_password: "string",
        students: [null],
      });
      // console.log(res);
    } catch (error) {
      console.log(error.reponse);
    }

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
