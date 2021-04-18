import { Button, makeStyles } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { toNumber } from "lodash";
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
    notes: "",
  });
  const history = useHistory();
  const handleNewMeeting = async (e) => {
    e.preventDefault();
    console.log(form);
    const {
      zoomLink,
      sessionLevel,
      topic,
      materials_object_name,
      materials_uploaded,
      miroLink,
      date,
      duration,
    } = form;
    // TODO: validate inputs

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
      });
      console.log(res.data);
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
