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
  const [studentList, setStudentList] = useState([<StudentInfo key={0} />]);
  const [guardianList, setGuardianList] = useState([<GuardianInfo key={0} />]);
  let header = <RegHeader />;
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

  const handleRemStudent = (e) => {
    setStudentList(studentList.slice(0, studentList.length - 1));
  };

  const handleAddGuardian = (e) => {
    setGuardianList(
      guardianList.concat(<GuardianInfo key={guardianList.length} />)
    );
  };

  const handleRemGuardian = (e) => {
    setGuardianList(guardianList.slice(0, guardianList.length - 1));
  };

  if (props.update) {
    const handleSeeAllMeetings = () => {
      history.push("/meetings");
    };
    header = <ProfHeader handleSeeAllMeetings={handleSeeAllMeetings} />;
    isUpdate = <ConsentUpload />;
    buttonVal = "Update";
  }

  return (
    <form id="regForm" onSubmit={handleFormSubmit}>
      {header}
      <h3 className="formHeader">Account Information</h3>
      <AccInfo update={props.update} />
      {isUpdate}
      <hr />
      <h3 className="formHeader">Student Information</h3>
      <div id="sList">{studentList}</div>
      <RemStudent handleRemStudent={handleRemStudent} />
      <AddNewStudent handleAddStudent={handleAddStudent} />
      <hr />
      <h3 className="formHeader">Guardian Information</h3>
      <div id="gList">{guardianList}</div>
      <RemGuardian handleRemGuardian={handleRemGuardian} />
      <AddNewGuardian handleAddGuardian={handleAddGuardian} />
      <hr />
      <h3 className="formHeader">Mailing List Opt In</h3>
      <MainOptInOptions />
      <input id="regButton" type="submit" value={buttonVal} />
    </form>
  );
}

export default Registration;
