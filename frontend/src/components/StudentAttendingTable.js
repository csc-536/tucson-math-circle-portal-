import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { cloneDeep, uniqueId } from "lodash";

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

const StudentAttendingTable = ({ students, setStudents, disabled }) => {
  const classes = useStyles();

  const handleChange = (e, i) => {
    const s = cloneDeep(students);
    s[i].attending = e.target.checked;
    setStudents(s);
  };
  console.log(disabled);
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="student-attending-table">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Student Name</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Attending</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(({ name, attending }, i) => (
            <TableRow key={uniqueId()}>
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  checked={attending}
                  onChange={(e) => handleChange(e, i)}
                  color="primary"
                  inputProps={{
                    "aria-label": "secondary checkbox",
                  }}
                  disabled={disabled}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentAttendingTable;
