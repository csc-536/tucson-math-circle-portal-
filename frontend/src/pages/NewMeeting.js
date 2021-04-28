import { Button, makeStyles } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import React, { useState } from "react";
import { useHistory } from "react-router";
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
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    date: new Date(),
    time: "",
    duration: "",
    topic: "",
    sessionLevel: "",
    materials_object_name: "",
    materials_uploaded: false,
    zoomLink: "",
    miroLink: "",
    student_note: "",
    coordinator_note: "",
  });
  const history = useHistory();
  const handleNewMeeting = async (e) => {
    e.preventDefault();
    const {
      zoomLink,
      sessionLevel,
      topic,
      materials_object_name,
      materials_uploaded,
      miroLink,
      date,
      duration,
      student_notes,
      coordinator_notes,
    } = form;
    // TODO: validate inputs
    const err = {};
    // TODO: Validate inputs
    if (duration === "") {
      err["duration"] = "Duration is required!";
    }
    if (topic === "") {
      err["topic"] = "Topic is required!";
    }
    if (sessionLevel === "") {
      err["sessionLevel"] = "Session level is required!";
    }
    if (zoomLink === "") {
      err["zoomLink"] = "Zoom link is required!";
    }
    if (miroLink === "") {
      err["miroLink"] = "Miro link is required!";
    }

    if (Object.keys(err).length !== 0) {
      setErrors(err);
      return;
    }

    // submit form
    try {
      const res = await addMeeting({
        date_and_time: date,
        duration,
        zoom_link: zoomLink,
        session_level: sessionLevel,
        topic,
        miro_link: miroLink,
        meeting_password: "string",
        materials_object_name,
        materials_uploaded,
        student_notes,
        coordinator_notes,
      });
      history.push("/meetings");
    } catch (error) {
      console.log(error.reponse);
    }
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
        <MeetingFields form={form} setForm={setForm} errors={errors} />
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
