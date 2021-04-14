/*
 * File: guardianInfo.js
 * Author: Athan Walker
 * Purpose: Provide a div for inputting guardian information
 */

import { Button, makeStyles } from "@material-ui/core";
import DeleteButton from "../components/DeleteButton";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "10px",
    marginLeft: "115px",
    width: "200px",
    fontSize: "12pt",
    backgroundColor: "#990000",
    borderRadius: "20px",
    color: "white",
  },
}));

function GuardianInfo({
  guardian: { first_name, last_name, email, phone_number },
  handleOnChange,
  handleRemGuardian,
}) {
  const classes = useStyles();

  let remGuardianButton_1 = (
    <div id="studentRemoveDiv">
      <button type="button" id="remGuardian" onClick={handleRemGuardian}>
        <b>Remove Guardian</b>
      </button>
    </div>
  );

  /*
   * Return a div for inputting first and last name, email and phone number.
   */
  return (
    <div id="GuardianInformation">
      <label className="col1">
        First Name:
        <input
          type="text"
          name="first_name"
          onChange={handleOnChange}
          value={first_name}
          className="formInput"
        />
      </label>
      <label className="col2">
        Last Name:
        <input
          type="text"
          name="last_name"
          onChange={handleOnChange}
          value={last_name}
          className="formInput"
        />
      </label>
      <label className="col1">
        Guardian Email:
        <input
          type="email"
          name="email"
          onChange={handleOnChange}
          value={email}
          className="formInput"
        />
      </label>
      <label className="col2">
        Phone:
        <input
          type="text"
          name="phone_number"
          onChange={handleOnChange}
          value={phone_number}
          className="formInput"
        />
      </label>
      <DeleteButton
        deleteAction={handleRemGuardian}
        className={classes.button}
      />
    </div>
  );
}

export default GuardianInfo;
