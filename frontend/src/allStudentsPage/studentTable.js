import "./allStudents.css";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import MoreInfo from "./moreInfo";
import { updateStudentVerification, getAllStudents } from "../http";
import { clone, uniqueId } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  cardActions: {
    float: "right",
  },
  modal: {
    display: "flex",
    height: "100%",
    alignItems: "baseline",
    justifyContent: "center",
    overflow: "auto",
    overflowY: "auto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: 5,
    padding: theme.spacing(2, 4, 3),
  },
  sInfoTag: {
    // float: "left",
  },
  sInfo: {
    // width: "100%",
    marginTop: "-20px",
  },
}));

function StudentTable({ paramStudentList, sectionList }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [studentList, setCurrStudentList] = useState(paramStudentList);
  const [currStudent, setCurrStudent] = useState(null);
  const [currAccount, setCurrAccount] = useState(null);

  // let currStudent = null;
  // console.log("STUDENTS");
  // console.log(studentList);
  useEffect(() => {
    const students = async () => {
      try {
        const res = await getAllStudents();
        console.log(res.data);
        setCurrStudentList(res.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    students();
  }, []);

  const getStudents = async () => {
    try {
      const res = await getAllStudents();
      console.log(res.data);
      setCurrStudentList(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleVerificationChange = async (student_id, status) => {
    if (status === null) {
      status = false;
    }
    status = !status;
    try {
      await updateStudentVerification({
        student_id,
        status,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const rootRef = React.useRef(null);
  const moreInfo = () => {
    return (
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
        container={() => rootRef.current}
      >
        <div className={classes.paper}>
          <MoreInfo
            sInfoTag={classes.sInfoTag}
            sInfo={classes.sInfo}
            student={currStudent}
            account={currAccount}
          />
        </div>
      </Modal>
    );
  };

  const sortTable = (rowList) => {
    console.log("ROWLIST");
    console.log(rowList);
    var rows, switching, i, x, y, shouldSwitch;
    // var table, rows, switching, i, x, y, shouldSwitch;
    // let table = document.getElementById("studentTable");
    if (rowList === []) {
      return;
    }
    // console.log("TABLE1");
    // console.log(table);//.props.children[1].props.children[0]);
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      // console.log("ROWS");
      // console.log(rows.length);
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 0; i < rowList.length - 1; i++) {
        // console.log("LOOP");
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rowList[i].props.children[0].props.children[0];
        y = rowList[i + 1].props.children[0].props.children[0];
        // Check if the two rows should switch place:
        // console.log(x + " <> " + y);
        if (x.toLowerCase() > y.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        // console.log("SWITCHING");
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        // rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        const temp = clone(rowList[i]);
        rowList[i] = rowList[i + 1];
        rowList[i + 1] = temp;
        switching = true;
      }
    }
  };

  let rowList = [];

  const makeTable = () => {
    rowList = [];
    studentList.map((account) => {
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
        account["student_list"].map((student) => {
          rowList.push(
            <tr key={uniqueId()}>
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
              <td>
                <input
                  type="checkbox"
                  id="verifyStatus"
                  defaultChecked={student["verification_status"]}
                  onClick={() => {
                    setCurrStudent(student);
                    handleVerificationChange(
                      student["id"],
                      student["verification_status"]
                    );
                    getStudents();
                  }}
                />
              </td>
              <td
                id="moreStudentInfo"
                onClick={() => {
                  setCurrStudent(student);
                  setCurrAccount(account);
                  handleOpen();
                }}
              >
                Click here
              </td>
            </tr>
          );
        });
      }
    });
  };

  makeTable();

  let sTable = (
    <table id="studentTable" border="4">
      <thead>
        <tr>
          <th>Student Last Name, First Name</th>
          <th>Junior (A) Attended/Registered</th>
          <th>Junior (B) Attended/Registered</th>
          <th>Senior Attended/Registered</th>
          <th>Guardian Name</th>
          <th>Guardian Phone</th>
          <th>Guardian Email</th>
          <th>Verify Student</th>
          <th>More Info</th>
        </tr>
      </thead>
      <tbody>
        {sortTable(rowList)}
        {rowList.map((row) => {
          console.log("HERE");
          return row;
        })}
      </tbody>
    </table>
  );

  return (
    <div>
      {moreInfo()}
      {sTable}
    </div>
  );
}

export default StudentTable;
