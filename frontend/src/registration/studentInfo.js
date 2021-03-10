/*
 * File: studentInfo.js
 * Author: Athan Walker
 * Purpose: Provide a div for inputting student information.
 */
function StudentInfo(props) {
  /*
   * Return a div for inputting first and last name, grade and age.
   */
  return (
    <div id="studentInformation">
      <label className="col1">
        Preffered First Name:
        <input type="text" name="sFirstName" />
      </label>
      <label className="col2">
        Last Name:
        <input type="text" name="sLastName" />
      </label>
      <label className="col1">
        Grade:
        <input type="text" name="grade" />
      </label>
      <label className="col2">
        Age:
        <input type="text" name="age" />
      </label>
    </div>
  );
}

export default StudentInfo;
