import React, { useEffect, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import MeetingFields from "../components/MeetingFields";
import RegisteredStudentTable from "../components/RegisteredStudentTable";
import SaveIcon from "@material-ui/icons/Save";
import { cloneDeep } from "lodash";
import DeleteButton from "../components/DeleteButton";
import { useLocation } from "react-router";

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
      },
    });
    // console.log(topic);
    // setRegisteredStudents(students);
    setDisabled(past);
  }, [location]);

  const [registeredStudents, setRegisteredStudents] = useState([
    {
      studentName: "Joe Doe1",
      parentName: "Jane Doe",
      contactPhone: 1234567890,
      additionalContacts: 24,
      attended: false,
    },
    {
      studentName: "Joe Doe2",
      parentName: "Jane Doe",
      contactPhone: 1234567890,
      additionalContacts: 24,
      attended: false,
    },
    {
      studentName: "Joe Doe3",
      parentName: "Jane Doe",
      contactPhone: 1234567890,
      additionalContacts: 24,
      attended: false,
    },
    {
      studentName: "Joe Doe3",
      parentName: "Jane Doe",
      contactPhone: 1234567890,
      additionalContacts: 24,
      attended: false,
    },
  ]);

  const handleCheckAttended = (e, i) => {
    const students = cloneDeep(registeredStudents);
    students[i].attended = e.target.checked;
    setRegisteredStudents(students);
  };

  const handleSaveMeeting = (e) => {
    e.preventDefault();
    console.log(form);

    // TODO: Validate inputs

    // TODO: submit form
  };

  const handleDelete = () => {
    console.log("delete");
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
          students={registeredStudents}
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
