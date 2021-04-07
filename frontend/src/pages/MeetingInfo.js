import React, { useEffect, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import MeetingFields from "../components/MeetingFields";
import RegisteredStudentTable from "../components/RegisteredStudentTable";
import SaveIcon from "@material-ui/icons/Save";
import { cloneDeep } from "lodash";
import DeleteButton from "../components/DeleteButton";
import { useHistory, useLocation } from "react-router";
import { deleteMeeting, updateMeeting } from "../http";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    float: "right",
  },
}));

const MeetingInfo = () => {
  const classes = useStyles();
  const location = useLocation();
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();
  const [form, setForm] = useState({
    date: new Date(),
    time: "",
    duration: "",
    topic: "",
    sessionLevel: "",
    material: "",
    zoomLink: "",
    zoomPassword: "",
    miroLink: "",
    notes: "",
    students: [],
  });

  useEffect(() => {
    const {
      state: {
        meeting: {
          date,
          sessionLevel,
          zoom_link,
          miro_link,
          zoomPassword,
          topic,
          duration,
          students,
          uuid,
        },
        past,
      },
    } = location;
    setForm({
      ...form,
      ...{
        date,
        time: getTime(date),
        topic,
        sessionLevel,
        zoomLink: zoom_link,
        miroLink: miro_link,
        zoomPassword,
        duration: getTimeDifferences(duration, date),
        uuid,
        students,
      },
    });
    setDisabled(past);
  }, [location]);

  const handleCheckAttended = (e, i) => {
    const students = cloneDeep(form["students"]);
    students[i].attended = e.target.checked;
    setForm({
      ...form,
      ...{ students },
    });
  };

  const handleSaveMeeting = async (e) => {
    e.preventDefault();
    const {
      students,
      date: date_and_time,
      miroLink: miro_link,
      sessionLevel: session_level,
      material: materials_link,
      zoomLink: zoom_link,
      duration,
      topic,
      uuid: meeting_id,
    } = form;
    console.log(form);

    // TODO: Validate inputs

    // TODO: submit form
    try {
      await updateMeeting({
        date_and_time,
        duration,
        zoom_link,
        session_level,
        topic,
        miro_link,
        coordinator_notes: "ddd",
        student_notes: "ddddddd",
        materials_link: "https://test.com",
        meeting_id,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDelete = async () => {
    try {
      console.log(form["uuid"]);
      await deleteMeeting(form["uuid"]);
      history.push("/meetings");
      console.log("delete");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        id="new-meeting-form"
        onSubmit={handleSaveMeeting}
      >
        <MeetingFields form={form} setForm={setForm} disabled={disabled} />
        <RegisteredStudentTable
          students={form["students"]}
          handleCheckAttended={handleCheckAttended}
        />
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
      <DeleteButton deleteAction={handleDelete} className={classes.button} />
    </div>
  );
};

function getTimeDifferences(d1, d2) {
  const diff = new Date(d1).getTime() - new Date(d2).getTime();
  return diff / 1000 / 60;
}

function getTime(d) {
  const date = new Date(d);
  const h = toTwoDigits(date.getHours());
  const m = toTwoDigits(date.getMinutes());
  return `${h}:${m}`;
}

function toTwoDigits(s) {
  return s < 10 ? `0${s}` : `${s}`;
}

export default MeetingInfo;
