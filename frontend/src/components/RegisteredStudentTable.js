import {
    Checkbox,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    withStyles,
} from "@material-ui/core";
import { uniqueId } from "lodash";
import React from "react";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        backgroundColor: "white",
    },
    container: {
        maxHeight: 600,
    },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        // backgroundColor: theme.palette.common.white,
        fontWeight: 800,
        fontSize: "16px",
    },
}))(TableCell);

const RegisteredStudentTable = ({ students, handleCheckAttended }) => {
    const classes = useStyles();
    console.log(students);
    return (
        <>
            <h3>Registered Students</h3>
            <TableContainer className={classes.container}>
                <Table
                    stickyHeader
                    className={classes.table}
                    aria-label="registered-student-table"
                >
                    <TableHead className={classes.head}>
                        <TableRow className={classes.head}>
                            <StyledTableCell>Student Name</StyledTableCell>
                            <StyledTableCell>Contact Email</StyledTableCell>
                            <StyledTableCell>Attended</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map(
                            ({ first_name, last_name, email, attended }, i) => (
                                <TableRow key={uniqueId()}>
                                    <TableCell component="th" scope="row">
                                        {`${first_name} ${last_name}`}
                                    </TableCell>
                                    <TableCell>{email}</TableCell>
                                    <TableCell>
                                        <Checkbox
                                            checked={attended}
                                            onChange={(e) =>
                                                handleCheckAttended(e, i)
                                            }
                                            color="primary"
                                            inputProps={{
                                                "aria-label":
                                                    "secondary checkbox",
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default RegisteredStudentTable;
