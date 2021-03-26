import React, { forwardRef, useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import RegisteredStudentTable from "./RegisteredStudentTable";
import StudentAttendingTable from "./StudentAttendingTable";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const Meeting = forwardRef(
  ({ meeting: { date, sessionLevel, topic, zoom_link, handleClose } }, ref) => {
    const [students, setStudents] = useState([
      { name: "jimmy", attending: true },
      { name: "jimmy1", attending: false },
    ]);

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(students);
      handleClose();
    };

    return (
      <div ref={ref}>
        <h2 id="meeting-title">Meeting</h2>
        <h3 id="transition-modal-title">When is the meeting?</h3>
        <p id="transition-modal-description">{date}</p>
        <h3>What is the meeting level?</h3>
        <p>{sessionLevel}</p>
        <h3>What are the topics?</h3>
        <p>{topic}</p>
        <h3>How can I join?</h3>
        <p>
          Join us on <a href={zoom_link}>Zoom</a> and <a href="#">Miro</a>
        </p>
        <h3>Need meeting materials?</h3>
        <p>
          Download meeting materials{" "}
          <a href="#">
            <b>here</b>
          </a>
        </p>
        <form
          noValidate
          autoComplete="off"
          id="student-attending-meeting-form"
          onSubmit={handleSubmit}
        >
          <FormControl component="fieldset">
            <FormGroup>
              <StudentAttendingTable
                students={students}
                setStudents={setStudents}
              />
            </FormGroup>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              type="submit"
              disableElevation
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </div>
    );
  }
);

export default Meeting;
