import React, { forwardRef, useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import StudentAttendingTable from "./StudentAttendingTable";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { registerMeeting } from "../http";
import { clone, some } from "lodash";
import S3DownloadLink from "./S3DownloadLink";

const Meeting = forwardRef(
  (
    {
      meeting: {
        uuid,
        date,
        sessionLevel,
        topic,
        zoom_link,
        miro_link,
        registrations,
        student_notes,
        setRegistrations,
        handleClose,
        materials_uploaded,
        past,
        duration,
      },
      unverifiedStudents,
    },
    ref
  ) => {
    const initalStudents = registrations
      .map(({ first_name, last_name, registered, id }) => {
        return {
          name: `${first_name} ${last_name}`,
          attending: registered,
          id,
        };
      })
      .filter(
        ({ id: sid }) =>
          !some(unverifiedStudents, ({ id: uvsid }) => sid === uvsid)
      );

    const [students, setStudents] = useState(initalStudents);

    const handleSubmit = async (e) => {
      e.preventDefault();

      for (let i = 0; i < students.length; i++) {
        if (students[i].attending !== initalStudents[i].attending) {
          try {
            await registerMeeting({
              meeting_id: uuid,
              student_id: students[i].id,
              registered: students[i].attending,
            });
            const s = clone(registrations);
            s[i].registered = students[i].attending;
            setRegistrations(s);
          } catch (error) {
            console.log(error);
          }
        }
      }
      handleClose();
    };
    return (
      <div ref={ref}>
        <h2 id="meeting-title">Meeting</h2>
        <h3 id="transition-modal-title">When is the meeting?</h3>
        <p id="transition-modal-description">{date}</p>
        <h3>How long is the meeting?</h3>
        <p>{duration} Minutes</p>
        <h3>What is the meeting level?</h3>
        <p>{sessionLevel}</p>
        <h3>What are the topics?</h3>
        <p>{topic}</p>
        <h3>How can I join?</h3>
        <p>
          Join us on <a href={zoom_link}>Zoom</a> and{" "}
          <a href={miro_link}>Miro</a>
        </p>
        {materials_uploaded ? (
          <>
            <h3>Need meeting materials?</h3>
            <p>
              Download meeting materials{" "}
              <S3DownloadLink fileType="material" id={uuid} text="here" />
            </p>
          </>
        ) : (
          ""
        )}

        {student_notes !== null ? (
          <>
            <h3>Notes</h3>
            <p>{student_notes}</p>
          </>
        ) : (
          ""
        )}
        {students.length > 0 ? (
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
                  disabled={past}
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
        ) : (
          ""
        )}
      </div>
    );
  }
);

export default Meeting;
