/*
 * File: studentInfo.js
 * Author: Athan Walker
 * Purpose: Provide a div for inputting student information.
 */

// import ConsentUpload from "./consentUpload";
import React, { useEffect } from "react";

function StudentInfo({
  student: { first_name, last_name, grade, age, selectedFile, status },
  update,
  handleOnChange,
  handleRemStudent,
}) {
  /*
   * 'selectedFile' is a state assigned to the file that is uploaded
   * 'isFilePicked' is a boolean indicating if a file has been uploaded
   */
  // const [selectedFile, setSelectedFile] = useState();
  // const [isFilePicked, setIsFilePicked] = useState(false);

  /*
   * 'changHandler' is called when a file has been uploaded.
   * Assigns the uploaded file to 'selectedFile' and 'isFilePicked'
   * to 'true'.
   */
  // const fileHandler = (event) => {
  //   setSelectedFile(event.target.files[0]);
  //   setIsFilePicked(true);
  //   // TODO delete next line, there are only here to satisfy github actions
  //   if (selectedFile && isFilePicked) {
  //     return;
  //   }
  // };

  let verifStyle = {};
  let statusText = "";

  let consentMaterial_1 = "";
  let consentMaterial_2 = "";

  let remStudentButton_1 = (
    <div id="studentRemoveDiv">
      <button type="button" id="remStudent" onClick={handleRemStudent}>
        <b>Remove Student</b>
      </button>
    </div>
  );

  let remStudentButton_2 = "";

  if (status) {
    verifStyle = { background: "green" };
    statusText = "Verified";
  } else {
    verifStyle = { background: "red" };
    statusText = "Unverified";
  }
  if (update) {
    consentMaterial_1 = (
      <label className="col1">
        <div id="consentUpload">
          Upload your <em>signed</em> consent form (PDF):
          <input type="file" name="file" onChange={handleOnChange} />
        </div>
      </label>
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
        <form name="grade" onChange={handleOnChange}>
          <select id="gradeDropDown" name="grade" value={grade}>
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
        </form>
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
      {remStudentButton_1}
    </div>
  );
}

export default StudentInfo;
