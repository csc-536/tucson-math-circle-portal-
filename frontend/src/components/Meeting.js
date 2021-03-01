import React, { forwardRef, useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";

const Meeting = forwardRef(({ meeting }, ref) => {
  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };
  return (
    <div ref={ref}>
      <h2 id="meeting-title">Meeting</h2>
      <h3 id="transition-modal-title">When is the meeting?</h3>
      <p id="transition-modal-description">July 20, 2014</p>
      <h3>What is the meeting level?</h3>
      <p>Junior</p>
      <h3>What are the topics?</h3>
      <p>Arithmetic</p>
      <h3>How can I join?</h3>
      <p>
        Join us on <a href="#">Zoom</a> and <a href="#">Miro</a>
      </p>
      <h3>Need meeting materials?</h3>
      <p>
        Download meeting materials{" "}
        <a href="#">
          <b>here</b>
        </a>
      </p>

      <FormControl component="fieldset">
        <FormGroup>
          <FormControlLabel
            // labelPlacement="start"
            // value="rsvp-checkbox"
            control={
              <Checkbox
                checked={checked}
                onChange={handleChange}
                name="rsvp-checkbox"
                color="primary"
              />
            }
            label="I'm Attending"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
});

export default Meeting;
