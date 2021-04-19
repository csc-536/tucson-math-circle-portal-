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
import React, { useContext, useEffect, useState } from "react";
import RegHeader from "./registrationHeader";
import {
  addProfile,
  updateProfile,
  profile,
  register,
  updateEmail,
  updatePassword,
} from "../http";
import { clone, uniqueId } from "lodash";
import { AuthContext } from "../contexts/AuthContext";
import { isLoggedIn, loggedInRole } from "../utils";
import { v4 as uuidv4 } from "uuid";

function Registration({ update }) {
  const initialStudent = {
    first_name: "",
    last_name: "",
    grade: "",
    age: "",
    consent_form_object_name: null,
    verification_status: false,
  };

  const initialGuardian = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
    repassword: "",
    newpassword: "",
    students: [initialStudent],
    guardians: [initialGuardian],
    mailing_lists: ["junior_a", "junior_b", "senior"],
  });

  const [checkBox, setCheckBox] = useState(false);

  /*
   * --------------------------------------------------------------------
   * BELOW IS ALL THE HANDLE FUNCTIONS FOR REGISTRATION AND PROFILE PAGES
   * --------------------------------------------------------------------
   */

  const handleOnChange = (e, i, type) => {
    const { name, value } = e.target;
    if (type === "students") {
      const students = clone(form.students);
      students[i][name] = value;
      setForm({ ...form, students });
      return;
    } else if (type === "guardians") {
      const guardians = clone(form.guardians);
      guardians[i][name] = value;
      setForm({ ...form, guardians });
      return;
    }
    const input = {};
    input[name] = value;

    setForm({ ...form, ...input });
  };

  /*
   * 'handleMailChange' handles the event of a mail in option being clicked.
   * If Junior A, B, or Senior is clicked, alternate its selected boolean and
   * unselect 'Opt Out'.
   * If 'Opt Out' is clicked and is selected, unselect all other options.
   * If the clicked radio button is the only currently selected, do nothing.
   */
  const handleMailChange = (e) => {
    const { value } = e.target;
    let mailing_lists = form.mailing_lists;
    if (mailing_lists.includes(value)) {
      if (mailing_lists.length === 1) {
        return;
      }
      const i = mailing_lists.indexOf(value);
      mailing_lists.splice(i, 1);
    } else {
      if (value === "opt_out") {
        mailing_lists = [];
      } else if (value !== "out_out") {
        mailing_lists.push(value);
      }
    }
    setForm({ ...form, mailing_lists });
  };

  const handleCheckBoxChange = (e) => {
    const { checked } = e.target;
    setCheckBox(checked);
  };

  /*
   * Adds a student to the list of students 'studentList'.
   */
  const handleAddStudent = (e) => {
    const newStudent = clone(initialStudent);
    const students = [...form.students, newStudent];
    setForm({ ...form, students });
  };

  /*
   * Removes the newest student from the list of students 'studentList'.
   */
  const handleRemStudent = (e, i) => {
    if (form.students.length > 1) {
      const students = clone(form.students);
      students.splice(i, 1);
      setForm({ ...form, students });
    }
  };

  /*
   * Adds a guardian to the list of guardians 'guardianList'.
   */
  const handleAddGuardian = (e) => {
    const newGuardian = clone(initialGuardian);
    const guardians = [...form.guardians, newGuardian];
    setForm({ ...form, guardians });
  };

  /*
   * Removes the newest guardian from the list of guardians 'guardianList'.
   */
  const handleRemGuardian = (e, i) => {
    if (form.guardians.length > 1) {
      const guardians = clone(form.guardians);
      guardians.splice(i, 1);
      setForm({ ...form, guardians });
    }
  };

  const handleAddConsentForm = (objectKey, i) => {
    console.log(objectKey);
    // console.log(i);
    console.log(form.students.length);
    if (form.students.length > 0) {
      const students = clone(form.students);
      students[i]["consent_form_object_name"] = objectKey;
      console.log(students);
      setForm({ ...form, students });
    }
    console.log(form);
  };
  console.log(form);
  /*
   * Pushes page path to the meetings page.
   */
  const handleSeeAllMeetings = () => {
    history.push("/meetings");
  };

  /*
   * This funciton verifies that all required input fields are filled
   * and are of the correct types. If not, it will return a string of
   * errors that will be displayed as an alert on the page
   */
  const checkFeilds = (
    email,
    password,
    repassword,
    newpassword,
    students,
    guardians,
    checkBox
  ) => {
    errStr = "";
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(mailformat)) {
      errStr += "Account email required\n";
    }
    if (!update && password.length < 6) {
      errStr += "Password needs to be at least 6 characters long\n";
    }
    if (!update && repassword !== password) {
      errStr += "Passwords do not match\n";
    }
    if (
      update &&
      newpassword !== null &&
      newpassword !== undefined &&
      newpassword !== "" &&
      newpassword.length < 6
    ) {
      errStr += "New password needs to be at least 6 characters long\n";
    }
    if (update && repassword != newpassword) {
      errStr += "Passwords do not match\n";
    }
    if (!update && checkBox !== true) {
      errStr += "Must check the box\n";
    }
    students.map((student, i) => {
      if (student.first_name === "") {
        errStr += "Student " + (i + 1) + ": First name required\n";
      }
      if (student.last_name === "") {
        errStr += "Student " + (i + 1) + ": Last name required\n";
      }
      if (student.age === "" || isNaN(student.age)) {
        errStr += "Student " + (i + 1) + ": Age required\n";
      }
      console.log(student.grade);
      if (student.grade === "select" || student.grade === "") {
        errStr += "Student " + (i + 1) + ": Grade required\n";
      }
    });
    guardians.map((guardian, i) => {
      if (guardian.first_name === "") {
        errStr += "Guardian " + (i + 1) + ": first name required\n";
      }
      if (guardian.last_name === "") {
        errStr += "Guardian " + (i + 1) + ": last name required\n";
      }
      if (!guardian.email.match(mailformat)) {
        errStr += "Guardian " + (i + 1) + ": email required\n";
      }
      if (
        guardian.phone_number === null ||
        guardian.phone_number === "" ||
        guardian.phone_number.length < 10
      ) {
        errStr += "Guardian " + (i + 1) + ": phone number required\n";
      }
    });

    return errStr;
  };

  const { setAuth } = useContext(AuthContext);

  /*
   * Handles the event of the form submission. Prevents the page from refreshing.
   * If property 'update' is true, return to the login page.
   */
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const {
      email,
      password,
      repassword,
      newpassword,
      students,
      guardians,
      mailing_lists,
    } = form;
    const str = checkFeilds(
      email,
      password,
      repassword,
      newpassword,
      students,
      guardians,
      checkBox
    );
    if (str !== "") {
      alert(str);
      return;
    }
    if (update) {
      try {
        await updateProfile({
          email,
          guardians,
          students,
          mailing_lists,
        });
        if (
          newpassword !== null &&
          newpassword !== undefined &&
          newpassword !== ""
        ) {
          await updatePassword({
            password: newpassword,
          });
        }
        await updateEmail({
          email,
        });
      } catch (error) {
        console.log(error.response);
      }
    } else {
      try {
        await register({ email, password, role: "student" });
        await addProfile({
          email,
          guardians,
          students,
          mailing_lists,
        });
        setAuth({ userLoggedIn: isLoggedIn(), role: loggedInRole() });
        history.push("/profile");
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  /*
   * --------------------------------------------------------------------
   * END OF HANDLE FUNCTIONS FOR REGISTRATION AND PROFILE PAGES
   * --------------------------------------------------------------------
   */

  /*
   * 'studentList' is a list of all the students affiliated with the account.
   */
  const studentList = form.students.map((student, i) => {
    return (
      <StudentInfo
        key={uuidv4()}
        student={student}
        update={update}
        handleOnChange={(e) => {
          console.log(i);
          handleOnChange(e, i, "students");
        }}
        handleRemStudent={(e) => handleRemStudent(e, i)}
        handleAddConsentForm={(objectKey) => {
          console.log(i);
          handleAddConsentForm(objectKey, i);
        }}
      />
    );
  });

  /*
   * 'guardianList' is a list of all the guardians affiliated with the account.
   */
  const guardianList = form.guardians.map((guardian, i) => {
    return (
      <GuardianInfo
        key={uuidv4()}
        guardian={guardian}
        handleOnChange={(e) => handleOnChange(e, i, "guardians")}
        handleRemGuardian={(e) => handleRemGuardian(e, i)}
      />
    );
  });

  /*
   * 'header' is the header of the page for either registration or profile page.
   * 'isUpdate' is affiliated with the consent form. Either is a checkbox or a
   * file upload.
   * 'buttonVal' is the text on the button for form submission.
   */
  let header = <RegHeader />;
  let isUpdate = <CheckBox handleCheckBoxChange={handleCheckBoxChange} />;
  let buttonVal = "Register";

  /*
   * 'history' used to render specified pages.
   */
  const history = useHistory();

  /*
   * If the page is a profile page, grabs the account information from the
   * main server and displays it
   */
  useEffect(() => {
    const pro = async () => {
      try {
        const res = await profile();
        const {
          data: { student_list: students, ...rest },
        } = res;
        setForm({ students, ...rest });
      } catch (error) {
        console.log(error.response);
      }
    };
    if (update) {
      pro();
    }
  }, []);

  let errStr = "";

  /*
   * If the property 'update' is true, set up 'header', 'isUpdate' and
   * 'buttonVal' to their profile page counterparts.
   */
  if (update) {
    header = <ProfHeader handleSeeAllMeetings={handleSeeAllMeetings} />;
    isUpdate = (
      <div>
        <br />
      </div>
    );
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
      <p className="regNote">
        Fill in the required fields to set up your account
      </p>
      <p className="regNote">
        NOTE: The email provided below is shared between all students associated
        with this account and will be used to recieve Tucson Math Circle meeting
        reminders and notifications
      </p>
      <p className="regNote">Password must be at least six characters long</p>
      <AccInfo update={update} handleOnChange={handleOnChange} form={form} />
      {isUpdate}
      <hr />
      <h3 className="formHeader">Student Information</h3>
      <p className="regNote">
        Fill in the required fields for each participating student
      </p>
      <div id="sList">{studentList}</div>
      <AddNewStudent handleAddStudent={handleAddStudent} />
      <br />
      <hr />
      <h3 className="formHeader">
        Guardian Information | <em>Emergency contact</em>
        <br />
      </h3>
      <p className="regNote">
        Fill in the required guardian fields for emergency contact purposes
      </p>
      <p className="regNote">
        NOTE: The first (top) guardian listed below will be the primary contact
        for all students linked to this account
      </p>
      <div id="gList">{guardianList}</div>
      <AddNewGuardian handleAddGuardian={handleAddGuardian} />
      <br />
      <hr />
      <h3 className="formHeader">Mailing List Opt In </h3>
      <p className="regNote">
        Select which session levels you would like to get emails about
      </p>
      <MainOptInOptions
        handleMailChange={(e) => handleMailChange(e)}
        mailing_lists={form.mailing_lists}
      />
      <p>{errStr}</p>
      <input id="regButton" type="submit" value={buttonVal} />
    </form>
  );
}

export default Registration;
