import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import React, { useState } from "react";
import { toNumber } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
  },
  textField: {
    marginRight: theme.spacing(5),
    width: "25ch",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
    float: "right",
  },
}));

const NewMeeting = () => {
  const classes = useStyles();

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

  const handleNewMeeting = (e) => {
    e.preventDefault();
    console.log(form);

    // TODO: Validate inputs

    // TODO: submit form
  };

  return (
    <div>
      <h1>Create meeting</h1>

      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        id="new-meeting-form"
        onSubmit={handleNewMeeting}
      >
        <h3>Date and Time</h3>
        <div>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              required
              disableToolbar
              variant="inline"
              label="Choose a Date"
              value={form["date"]}
              onChange={handleDateChange}
              className={classes.textField}
            />
          </MuiPickersUtilsProvider>
          <TextField
            required
            id="time"
            label="Choose a Time"
            type="time"
            onChange={handleOnChange}
            name="time"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <TextField
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
            <InputLabel shrink id="new-meeting-level-input-label" required>
              Session Level
            </InputLabel>
            <Select
              labelId="new-meeting-level-select-label"
              id="new-meeting-level-select"
              value={form["sessionLevel"]}
              onChange={handleOnChange}
              name="select"
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value={"ja"}>Junior (A)</MenuItem>
              <MenuItem value={"jb"}>Junior (B)</MenuItem>
              <MenuItem value={"s"}>Senior</MenuItem>
            </Select>
          </FormControl>
        </div>

        <h3>Materials</h3>
        <div>
          <TextField
            id="new-meeting-zoom-link"
            label="Meeting Material"
            name="material"
            value={form["material"]}
            onChange={handleOnChange}
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.textField}
          />
        </div>

        <h3>How to Join</h3>
        <div>
          <TextField
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
        <h3>Others</h3>
        <div>
          <TextField
            id="new-meeting-notes"
            label="Notes"
            multiline
            rows={5}
            name="notes"
            value={form["notes"]}
            onChange={handleOnChange}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </div>

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
    </div>
  );
};

export default NewMeeting;
