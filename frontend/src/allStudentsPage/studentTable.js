import "./allStudents.css";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    cardActions: {
      float: "right",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      borderRadius: 5,
      padding: theme.spacing(2, 4, 3),
    },
  }));

function StudentTable({ studentList, sectionList }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rootRef = React.useRef(null);
  let moreInfo = (
    <Modal
      id="moreStudentInfo"
      open={open}
      className={classes.modal}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      disableEnforceFocus
      disableAutoFocus
      container={() => rootRef.current}>
      <div className={classes.paper}>
        Some text
      </div>
    </Modal>
  );

  return (
    <div>
      {moreInfo}
      <table id="studentTable" border="4">
        <tr>
          <th>Student Last Name, First Name</th>
          <th>Junior (A) Attended/Registered</th>
          <th>Junior (B) Attended/Registered</th>
          <th>Senior Attended/Registered</th>
          <th>Guardian Name</th>
          <th>Guardian Phone</th>
          <th>Guardian Email</th>
          <th>More Info</th>
        </tr>
        {studentList.map((account) => {
          let filteredIn = false;
          if (
            account["mailing_lists"].length === 0 &&
            sectionList.includes("opt_out")
          ) {
            filteredIn = true;
          }
          account["mailing_lists"].map((section) => {
            if (sectionList.includes(section)) {
              filteredIn = true;
            }
          });
          if (filteredIn) {
            return account["student_list"].map((student) => {
              return (
                <tr>
                  <td>
                    {student["last_name"]}, {student["first_name"]}
                  </td>
                  <td>
                    {student["meeting_counts"]["junior_a"]["attended"]} /{" "}
                    {student["meeting_counts"]["junior_a"]["registered"]}
                  </td>
                  <td>
                    {student["meeting_counts"]["junior_b"]["attended"]} /{" "}
                    {student["meeting_counts"]["junior_b"]["registered"]}
                  </td>
                  <td>
                    {student["meeting_counts"]["senior"]["attended"]} /{" "}
                    {student["meeting_counts"]["senior"]["registered"]}
                  </td>
                  <td>
                    {account["guardians"][0]["first_name"]}{" "}
                    {account["guardians"][0]["last_name"]}
                  </td>
                  <td>{account["guardians"][0]["phone_number"]}</td>
                  <td>{account["guardians"][0]["email"]}</td>
                  <td id="moreStudentInfo" onClick={handleOpen}>Click here</td>
                </tr>
              );
            });
          } else {
            return;
          }
        })}
      </table>
    </div>
  );
}

export default StudentTable;
