import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Meeting from "./Meeting";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router";

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

const MeetingCard = ({ meeting, past }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    console.log(meeting);

    const {
        uuid,
        topic,
        date_and_time,
        duration,
        session_level,
        zoom_link,
        miro_link,
        materials_link,
        student_notes,
        coordinator_notes,
        password,
        students,
        materials_uploaded,
        materials_object_name,
    } = meeting;

    const [registrations, setRegistrations] = useState(meeting.registrations);

    const {
        auth: { role },
    } = useContext(AuthContext);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const date = getDate(date_and_time);
    const sessionLevel = getSessionLevel(session_level);

    const history = useHistory();
    const handleEdit = () => {
        history.push({
            pathname: "/meeting",
            state: {
                meeting: {
                    uuid,
                    date: date_and_time,
                    sessionLevel: session_level,
                    zoom_link,
                    miro_link,
                    materials_object_name,
                    student_notes,
                    coordinator_notes,
                    zoomPassword: password,
                    topic,
                    duration,
                    students,
                    materials_uploaded,
                },
                past,
            },
        });
    };

    const rootRef = React.useRef(null);
    return (
        <Card className={classes.root} variant="outlined">
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
                disableEnforceFocus
                disableAutoFocus
                container={() => rootRef.current}
            >
                <div className={classes.paper}>
                    <Meeting
                        meeting={{
                            uuid,
                            date,
                            sessionLevel,
                            topic,
                            zoom_link,
                            miro_link,
                            materials_link,
                            student_notes,
                            registrations,
                            materials_uploaded,
                            duration,
                            past,
                            setRegistrations,
                            handleClose,
                        }}
                    />
                </div>
            </Modal>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                    {sessionLevel} <br /> {topic}
                </Typography>
                <Typography variant="h6" component="h6" color="textSecondary">
                    {date}
                </Typography>
                <Typography variant="body1" component="p">
                    Join us to study {topic}, and you won't regret it!!
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                {role === "admin" ? (
                    <Button size="small" color="primary" onClick={handleEdit}>
                        Edit
                    </Button>
                ) : (
                    <Button size="small" color="primary" onClick={handleOpen}>
                        Learn More
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

function getSessionLevel(str) {
    switch (str) {
        case "junior_a":
            return "Junior A";
        case "junior_b":
            return "Junior B";
        case "senior":
            return "Senior";
        default:
            return "";
    }
}

function getDate(date) {
    const d = new Date(date).toLocaleString();
    return d;
}

export default MeetingCard;
