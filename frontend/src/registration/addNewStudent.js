/*
 * File: addNewStudent.js
 * Author: Athan Walker
 * Purpose: Provide a button that can add a new student to the registration
 *          form or profile page.
 */
function AddNewStudent(props) {
  /*
   * 'handleAddStudent' is a function passed from registration.js that
   * handles the event of this button being clicked.
   */
  return (
    <div id="addStudentDiv">
      <button type="button" id="addStudent" onClick={props.handleAddStudent}>
        + New Student
      </button>
    </div>
  );
}

export default AddNewStudent;
