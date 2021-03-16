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
import RemGuardian from "./remGuardian";
import RemStudent from "./remStudent";
import { addProfile, updateProfile, profile, register } from "../http";
import { clone, uniqueId } from "lodash";

function Registration({ update }) {
  const initialStudent = {
    first_name: "",
    last_name: "",
    grade: "",
    age: "",
    section: ["junior_a", "junior_b", "senior"],
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
  });

  const handleOnChange = (e, i, type) => {
    const { name, value } = e.target;
    if (type === "students") {
      console.log(form.students);
      const students = clone(form.students);
      students[i][name] = value;
      // console.log(form.students);
      setForm({ ...form, students });
      return;
    }
    if (type === "guardians") {
      const guardians = clone(form.guardians);
      guardians[i][name] = value;
      setForm({ ...form, guardians });
      return;
    }

    const input = {};
    input[name] = value;

    setForm({ ...form, ...input });
    // console.log(form);
  };

  /*
   * 'studentList' is a list of all the students affiliated with the account.
   * 'guardianList' is a list of all the guardians affiliated with the account.
   */
  const studentList = form.students.map((student, i) => {
    return (
      <StudentInfo
        key={i}
        student={student}
        handleOnChange={(e) => handleOnChange(e, i, "students")}
      />
    );
  });

  const guardianList = form.guardians.map((guardian, i) => {
    return (
      <GuardianInfo
        key={i}
        guardian={guardian}
        handleOnChange={(e) => handleOnChange(e, i, "guardians")}
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
  let isUpdate = <CheckBox />;
  let buttonVal = "Register";

  /*
   * 'history' used to render specified pages.
   */
  const history = useHistory();

  useEffect(() => {
    const pro = async () => {
      try {
        const res = await profile();
        const {
          data: { student_list: students, ...rest },
        } = res;
        students["section"] = ["junior_a"];
        console.log(students);
        setForm({ students, ...rest });

        // console.log(form);
      } catch (error) {
        console.log(error.response);
      }
    };
    if (update) {
      pro();
    }
  }, []);

  let errStr = "";

  const checkFeilds = (email, password, repassword, students, guardians) => {
    errStr = "";
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(mailformat)) {
      errStr += "Account email required\n";
    }
    if (!update && password.length < 6) {
      errStr += "Password needs to be at least 6 characters long\n";
    }
    if (!update && repassword !== password) {
      errStr += "Passwords do not match\n";
    }
    students.map((student, i) => {
      if (student.first_name === "") {
        errStr += "Student " + (i + 1) + ": First name required\n";
      }
      if (student.last_name === "") {
        errStr += "Student " + (i + 1) + ": Last name required\n";
      }
      if (student.grade === "") {
        errStr += "Student " + (i + 1) + ": Grade required\n";
      }
      if (student.age === "") {
        errStr += "Student " + (i + 1) + ": Age required\n";
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
      if (guardian.phone_number === null || guardian.phone_number === "") {
        errStr += "Guardian " + (i + 1) + ": age required\n";
      }
    });

    return errStr;
  }

  /*
   * Handles the event of the form submission. Prevents the page from refreshing.
   * If property 'update' is true, return to the login page.
   */
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { email, password, repassword, students, guardians } = form;
    const str = checkFeilds(email, password, repassword, students, guardians)
    if(str !== ""){ 
      alert(str);
      return;
    }

    if (update) {
      try {
        console.log("FORM: ");
        console.log(form);
        await updateProfile({
          email,
          guardians,
          students,
        });
      } catch (error) {
        console.log(error.response);
      }
    } else {
      if (password !== repassword) {
        return console.log("Two passwords don't match");
      }

      if (password.length < 6) {
        return console.log("Password should be at least 6 characters");
      }

      console.log(form);
      try {
        await register({ email, password, role: "student" });
        await addProfile({
          email,
          guardians,
          students,
        });
        history.push("/");
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  /*
   * Adds a student to the list of students 'studentList'.
   */
  const handleAddStudent = (e) => {
    const newStudent = initialStudent;
    const students = [...form.students, newStudent];
    setForm({ ...form, students });
    console.log(form);
  };

  /*
   * Removes the newest student from the list of students 'studentList'.
   */
  const handleRemStudent = (e) => {
    if (form.students.length > 1) {
      const students = clone(form.students);
      students.pop();
      setForm({ ...form, students });
    }
  };

  /*
   * Adds a guardian to the list of guardians 'guardianList'.
   */
  const handleAddGuardian = (e) => {
    const newGuardian = initialGuardian;
    const guardians = [...form.guardians, newGuardian];
    setForm({ ...form, guardians });
    console.log(form);
  };

  /*
   * Removes the newest guardian from the list of guardians 'guardianList'.
   */
  const handleRemGuardian = (e) => {
    if (form.guardians.length > 1) {
      const guardians = clone(form.guardians);
      guardians.pop();
      setForm({ ...form, guardians });
    }
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
  if (update) {
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
      <AccInfo update={update} handleOnChange={handleOnChange} form={form} />
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
      <p>{errStr}</p>
      <input id="regButton" type="submit" value={buttonVal} />
    </form>
  );
}

export default Registration;
