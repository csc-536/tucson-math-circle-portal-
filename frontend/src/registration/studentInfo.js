/*
 * File: studentInfo.js
 * Author: Athan Walker
 * Purpose: Provide a div for inputting student information.
 */

function StudentInfo({
  student: { first_name, last_name, grade, age },
  handleOnChange,
}) {

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
        />
      </label>
      <label className="col2">
        Last Name:
        <input
          type="text"
          name="last_name"
          value={last_name}
          onChange={handleOnChange}
        />
      </label>
      <label className="col1">
        Grade:
        <input
          type="text"
          name="grade"
          value={grade}
          onChange={handleOnChange}
        />
      </label>
      <label className="col2">
        Age:
        <input type="text" name="age" value={age} onChange={handleOnChange} />
      </label>
    </div>
  );
}

export default StudentInfo;
