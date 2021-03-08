import "./registration.css";
import AccInfo from "./accountInfo";
import CheckBox from "./checkBox";
import StudentInfo from "./studentInfo";
import GuardianInfo from "./guardianInfo";
import ConsentUpload from "./consentUpload";
import MainOptInOptions from "./mailOptInOptions";
import { useHistory } from "react-router";
import React, { useState } from "react";

function Registration(props) {
  const [studentList, setStudentList] = useState([<StudentInfo key={0} />]);
  const [guardianList, setGuardianList] = useState([<GuardianInfo key={0} />]);
  let header = (
    <div>
      <h1>Account Registration Form</h1>
    </div>
  );
  let isUpdate = <CheckBox />;
  let buttonVal = "Register";

  const history = useHistory();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!props.update) {
      history.push("/");
    }
    // TODO: other stuff
  };

  const handleAddStudent = (e) => {
    setStudentList(
      studentList.concat(<StudentInfo key={studentList.length} />)
    );
  };

  const addNewStudent = (
    <div id="addStudentDiv">
      <button type="button" id="addStudent" onClick={handleAddStudent}>
        + New Student
      </button>
    </div>
  );

  const handleAddGuardian = (e) => {
    setGuardianList(
      guardianList.concat(<GuardianInfo key={guardianList.length} />)
    );
  };

  const addNewGuardian = (
    <div id="addGuardianDiv">
      <button type="button" id="addGuardian" onClick={handleAddGuardian}>
        + New Guardian
      </button>
    </div>
  );

  if (props.update) {
    const handleSeeAllMeetings = () => {
      history.push("/meetings");
    };
    header = (
      <div>
        <h1 id="profileHeader">Profile</h1>
        <button type="button" id="allMeetings" onClick={handleSeeAllMeetings}>
          See All Meetings
        </button>
      </div>
    );
    isUpdate = <ConsentUpload />;
    buttonVal = "Update";
  }
  return (
    <form id="regForm" onSubmit={handleFormSubmit}>
      {header}
      <AccInfo update={props.update} />
      {isUpdate}
      <hr />
      <h3>Student Information</h3>
      <div id="sList">{studentList}</div>
      {addNewStudent}
      <hr />
      <h3>Guardian Information</h3>
      <div id="gList">{guardianList}</div>
      {addNewGuardian}
      <hr />
      <h3>Mailing List Opt In</h3>
      <MainOptInOptions />
      <input id="regButton" type="submit" value={buttonVal} />
    </form>
  );
}

export default Registration;
