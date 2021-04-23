/*
 * File: studentInfo.js
 * Author: Athan Walker
 * Purpose: Provide a div for inputting student information.
 */

// import ConsentUpload from "./consentUpload";
import React, { useEffect, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import DeleteButton from "../components/DeleteButton";
import S3UploadInput from "../components/S3UploadInput";

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

function StudentInfo({
  student: {
    first_name,
    last_name,
    grade,
    age,
    verification_status,
    consent_form_object_name,
  },
  update,
  handleOnChange,
  handleRemStudent,
  handleAddConsentForm,
}) {
  const classes = useStyles();

  let verifStyle = {};
  let statusText = "";

  let consentMaterial_1 = "";
  let consentMaterial_2 = "";

  let delObject = "STUDENT " + first_name + " " + last_name;

  let remStudentButton_1 = (
    <div id="studentRemoveDiv">
      <button type="button" id="remStudent" onClick={handleRemStudent}>
        <b>Remove Student</b>
      </button>
    </div>
  );

  let remStudentButton_2 = "";

  if (verification_status) {
    verifStyle = { background: "green" };
    statusText = "Verified";
  } else {
    verifStyle = { background: "red" };
    statusText = "Unverified";
  }

  // const [objectKey, setObjectKey] = useState(null);
  // console.log(objectKey);
  if (update) {
    let uploadedFileName = "";
    if (consent_form_object_name) {
      uploadedFileName = consent_form_object_name.split("_");
      uploadedFileName.pop();
      uploadedFileName = `${uploadedFileName.join("_")}.pdf`;
    }

    consentMaterial_1 = (
      <S3UploadInput
        callback={handleAddConsentForm}
        uploadedFileName={uploadedFileName}
      />
    );
    consentMaterial_2 = (
      <label className="col2">
        Consent form verification status:
        <div style={verifStyle} id="consentStatus">
          {statusText}
        </div>
      </label>
    );
  }

  /*
   * Return a div for inputting first and last name, grade and age.
   */
  return (
    <div id="studentInformation">
      <label className="col1">
        Prefered First Name:
        <input
          type="text"
          name="first_name"
          value={first_name}
          onChange={handleOnChange}
          className="formInput"
        />
      </label>
      <label className="col2">
        Last Name:
        <input
          type="text"
          name="last_name"
          value={last_name}
          onChange={handleOnChange}
          className="formInput"
        />
      </label>
      <label className="col1">
        Grade:
        <select
          id="gradeDropDown"
          name="grade"
          value={grade}
          onChange={handleOnChange}
        >
          <option value="select">Select</option>
          <option value="PreK">Pre-K</option>
          <option value="K">K</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </label>
      <label className="col2">
        Age:
        <input
          type="text"
          name="age"
          value={age}
          onChange={handleOnChange}
          className="formInput"
        />
      </label>
      {consentMaterial_1}
      {consentMaterial_2}
      <DeleteButton
        deleteAction={handleRemStudent}
        className={classes.button}
        delObject={delObject}
      />
    </div>
  );
}

export default StudentInfo;
