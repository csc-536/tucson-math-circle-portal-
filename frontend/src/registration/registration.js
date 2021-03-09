/*
 * File: registration.js
 * Author: Athan Walker
 * Purpose: Provide a full registration or profile page depending on context.
 */
import "./registration.css";
import AccInfo from "./accountInfo";
import AddNewGuardian from "./addNewGuardian";
import AddNewStudent from "./addNewStudent";
import CheckBox from "./checkBox";
import StudentInfo from "./studentInfo";
import GuardianInfo from "./guardianInfo";
import ConsentUpload from "./consentUpload";
import MainOptInOptions from "./mailOptInOptions";
import { useHistory } from "react-router";
import ProfHeader from "./profileHeader";
import React, { useState } from "react";
import RegHeader from "./registrationHeader";
import RemGuardian from "./remGuardian";
import RemStudent from "./remStudent";

function Registration(props) {
  /*
   * 'studentList' is a list of all the students affiliated with the account.
   * 'guardianList' is a list of all the guardians affiliated with the account.
   */
  const [studentList, setStudentList] = useState([<StudentInfo key={0} />]);
  const [guardianList, setGuardianList] = useState([<GuardianInfo key={0} />]);

  /*
   * 'header' is the header of the page for either registration or profile page.
   * 'isUpdate' is affiliated with the consent form. Either is a checkbox or a
   * file upload.
   * 'buttonVal' is the text on the button for form submission.
   */
  let header = <RegHeader />;
  let isUpdate = <CheckBox />;
  let buttonVal = "Register";

  /*
   * 'history' used to render specified pages.
   */
  const history = useHistory();

  /*
   * Handles the event of the form submission. Prevents the page from refreshing.
   * If property 'update' is true, return to the login page.
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!props.update) {
      history.push("/");
    }
    // TODO: other stuff
  };

  /*
   * Adds a student to the list of students 'studentList'.
   */
  const handleAddStudent = (e) => {
    setStudentList(
      studentList.concat(<StudentInfo key={studentList.length} />)
    );
  };

  /*
   * Removes the newest student from the list of students 'studentList'.
   */
  const handleRemStudent = (e) => {
    if (studentList.length == 1) {
      return;
    }
    setStudentList(studentList.slice(0, studentList.length - 1));
  };

  /*
   * Adds a guardian to the list of guardians 'guardianList'.
   */
  const handleAddGuardian = (e) => {
    setGuardianList(
      guardianList.concat(<GuardianInfo key={guardianList.length} />)
    );
  };

  /*
   * Removes the newest guardian from the list of guardians 'guardianList'.
   */
  const handleRemGuardian = (e) => {
    if (guardianList.length == 1) {
      return;
    }
    setGuardianList(guardianList.slice(0, guardianList.length - 1));
  };

  /*
   * Pushes page path to the meetings page.
   */
  const handleSeeAllMeetings = () => {
    history.push("/meetings");
  };

  /*
   * If the property 'update' is true, set up 'header', 'isUpdate' and
   * 'buttonVal' to their profile page counterparts.
   */
  if (props.update) {
    header = <ProfHeader handleSeeAllMeetings={handleSeeAllMeetings} />;
    isUpdate = <ConsentUpload />;
    buttonVal = "Update";
  }

  /*
   * Returns a form for a profile or registration page depending on the 'update'
   * property.
   */
  return (
    <form id="regForm" onSubmit={handleFormSubmit}>
      {header}
      <h3 className="formHeader">Account Information</h3>
      <AccInfo update={props.update} />
      {isUpdate}
      <hr />
      <h3 className="formHeader">Student Information</h3>
      <div id="sList">{studentList}</div>
      <AddNewStudent handleAddStudent={handleAddStudent} />
      <RemStudent handleRemStudent={handleRemStudent} />
      <hr />
      <h3 className="formHeader">
        Guardian Information | <em>Emergency contact</em>
      </h3>
      <div id="gList">{guardianList}</div>
      <AddNewGuardian handleAddGuardian={handleAddGuardian} />
      <RemGuardian handleRemGuardian={handleRemGuardian} />
      <hr />
      <h3 className="formHeader">Mailing List Opt In</h3>
      <MainOptInOptions />
      <input id="regButton" type="submit" value={buttonVal} />
    </form>
  );
}

export default Registration;
