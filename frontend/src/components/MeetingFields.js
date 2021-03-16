import React from "react";

import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { toNumber } from "lodash";

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

  return (
    <>
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
            disabled={disabled}
          />
        </MuiPickersUtilsProvider>
        <TextField
          disabled={disabled}
          required
          id="time"
          label="Choose a Time (Local Time)"
          value={form["time"]}
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
          <InputLabel shrink id="new-meeting-level-input-label" required>
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
        <TextField
          disabled={disabled}
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
      <h3>Others</h3>
      <div>
        <TextField
          disabled={disabled}
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
    </>
  );
};

export default MeetingFields;
