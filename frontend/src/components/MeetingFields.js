import React, { useState } from "react";

import {
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";
import {
    DatePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
    TimePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { toNumber } from "lodash";
import S3UploadInput from "./S3UploadInput";

const useStyles = makeStyles((theme) => ({
    textField: {
        marginRight: theme.spacing(5),
        width: "25ch",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const MeetingFields = ({ form, setForm, disabled }) => {
    const classes = useStyles();

    // const handleDateChange = (e) => {
    //     setForm({ ...form, ...{ date: new Date(e) } });
    // };

    // const [selectedDate, handleDateChange] = useState(new Date());
    // console.log(selectedDate.toJSON());

    const handleDateChange = (e) => {
        setForm({ ...form, ...{ date: new Date(e) } });
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        let v = value;
        switch (name) {
            case "duration":
                v = isNaN(value) ? form[name] : toNumber(value);
                break;
            default:
                break;
        }

        const input = {};
        input[name] = v;
        setForm({ ...form, ...input });
    };
    console.log("asdfghjk", form);
    const handleUploadFileCallback = (objectKey) => {
        setForm({
            ...form,
            ...{ materials_object_name: objectKey, materials_uploaded: true },
        });
    };

    return (
        <>
            <h3>Date and Time</h3>
            <div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker
                        autoOk
                        required
                        className={classes.textField}
                        label="Pick the Date and Time (Local)"
                        value={form["date"]}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleDateChange}
                        disabled={disabled}
                    />
                </MuiPickersUtilsProvider>

                <TextField
                    disabled={disabled}
                    id="meeting-duration"
                    label="Duration (Minutes)"
                    name="duration"
                    min={0}
                    value={form["duration"]}
                    onChange={handleOnChange}
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.textField}
                />
            </div>

            <h3>Details</h3>
            <div>
                <TextField
                    disabled={disabled}
                    id="new-meeting-topic"
                    label="Topic"
                    name="topic"
                    value={form["topic"]}
                    onChange={handleOnChange}
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.textField}
                />
                <FormControl className={classes.textField}>
                    <InputLabel
                        shrink
                        id="new-meeting-level-input-label"
                        required
                    >
                        Session Level
                    </InputLabel>
                    <Select
                        disabled={disabled}
                        labelId="new-meeting-level-select-label"
                        id="new-meeting-level-select"
                        value={form["sessionLevel"]}
                        onChange={handleOnChange}
                        name="sessionLevel"
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        <MenuItem value={"junior_a"}>Junior (A)</MenuItem>
                        <MenuItem value={"junior_b"}>Junior (B)</MenuItem>
                        <MenuItem value={"senior"}>Senior</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <h3>Materials</h3>
            <div>
                <S3UploadInput
                    callback={handleUploadFileCallback}
                    // uploadedFileName={}
                />
            </div>

            <h3>How to Join</h3>
            <div>
                <TextField
                    disabled={disabled}
                    id="new-meeting-zoom-link"
                    label="Zoom Link"
                    name="zoomLink"
                    value={form["zoomLink"]}
                    required
                    onChange={handleOnChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.textField}
                />
                <TextField
                    disabled={disabled}
                    id="new-meeting-zoom-link"
                    label="Zoom Password"
                    name="zoomPassword"
                    value={form["zoomPassword"]}
                    required
                    onChange={handleOnChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.textField}
                />
                <TextField
                    disabled={disabled}
                    id="new-meeting-miro-link"
                    label="Miro Link"
                    name="miroLink"
                    value={form["miroLink"]}
                    required
                    onChange={handleOnChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.textField}
                />
            </div>
            <h3>Notes</h3>
            <div>
                <TextField
                    disabled={disabled}
                    id="new-meeting-notes-students"
                    label="For Students"
                    multiline
                    rows={5}
                    name="student_notes"
                    value={form["student_notes"]}
                    onChange={handleOnChange}
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    style={{ marginBottom: "35px" }}
                />
                <TextField
                    disabled={disabled}
                    id="new-meeting-notes-coordinators"
                    label="For Coordinators"
                    multiline
                    rows={5}
                    name="coordinator_notes"
                    value={form["coordinator_notes"]}
                    onChange={handleOnChange}
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
            </div>
        </>
    );
};

export default MeetingFields;
