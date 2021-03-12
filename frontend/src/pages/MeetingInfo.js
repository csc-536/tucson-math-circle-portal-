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

    useEffect(() => {
        const {
            state: { meeting, past }, // form's default value
        } = location;
        setDisabled(past);
    }, [location]);

    const [form, setForm] = useState({
        date: new Date(),
        time: "",
        duration: "",
        topic: "",
        sessionLevel: "ja",
        material: "",
        zoomLink: "",
        miroLink: "",
        notes: "",
    });

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
                <MeetingFields
                    form={form}
                    setForm={setForm}
                    disabled={disabled}
                />
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
            <DeleteButton
                deleteAction={handleDelete}
                className={classes.button}
            />
        </div>
    );
};

export default MeetingInfo;
