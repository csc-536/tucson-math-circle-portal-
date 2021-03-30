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
        <form name="grade" value={grade} onChange={handleOnChange}>
          <select id="gradeDropDown" name="grade">
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
    </div>
  );
}

export default StudentInfo;
