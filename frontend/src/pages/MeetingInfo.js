import React, { useEffect, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import MeetingFields from "../components/MeetingFields";
import RegisteredStudentTable from "../components/RegisteredStudentTable";
import SaveIcon from "@material-ui/icons/Save";
import { cloneDeep } from "lodash";
import DeleteButton from "../components/DeleteButton";
import { useHistory, useLocation } from "react-router";
import {
    attendMeeting,
    deleteMeeting,
    registerMeeting,
    updateMeeting,
} from "../http";

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
        materials_object_name: "",
        materials_uploaded: false,
        zoomLink: "",
        zoomPassword: "",
        miroLink: "",
        student_notes: "",
        coordinator_notes: "",
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
                    materials_object_name,
                    materials_uploaded,
                    student_notes,
                    coordinator_notes,
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
                materials_object_name,
                materials_uploaded,
                zoomPassword,
                duration,
                uuid,
                students,
                student_notes,
                coordinator_notes,
            },
        });
        setDisabled(past);
    }, [location]);

    const handleCheckAttended = async (e, i) => {
        const students = cloneDeep(form["students"]);
        const attended = e.target.checked;
        const { student_id } = students[i];
        try {
            await attendMeeting({
                meeting_id: form["uuid"],
                student_id,
                attended,
            });
            students[i].attended = attended;
            setForm({
                ...form,
                ...{ students },
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    const handleSaveMeeting = async (e) => {
        e.preventDefault();
        const {
            students,
            date: date_and_time,
            miroLink: miro_link,
            sessionLevel: session_level,
            materials_object_name,
            materials_uploaded,
            student_notes,
            coordinator_notes,
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
                materials_object_name,
                materials_uploaded,
                meeting_id,
                student_notes,
                coordinator_notes,
            });
            history.push("/meetings");
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
                <MeetingFields
                    form={form}
                    setForm={setForm}
                    disabled={disabled}
                />
                {disabled ? (
                    ""
                ) : (
                    <div style={{ marginBottom: "60px" }}>
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
                        <DeleteButton
                            deleteAction={handleDelete}
                            className={classes.button}
                        />
                    </div>
                )}

                <RegisteredStudentTable
                    students={form["students"]}
                    handleCheckAttended={handleCheckAttended}
                />
            </form>
        </div>
    );
};

// function getTimeDifferences(d1, d2) {
//     const diff = new Date(d1).getTime() - new Date(d2).getTime();
//     return diff / 1000 / 60;
// }

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
