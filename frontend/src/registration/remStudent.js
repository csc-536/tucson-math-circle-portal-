/*
 * File: remStudent.js
 * Author: Athan Walker
 * Purpose: Provide a button that can remove a student from the registration
 *          form or profile page.
 */
function RemStudent(props) {
  /*
   * 'handleRemStudent' is a function passed from registration.js that
   * handles the event of this button being clicked.
   */
  return (
    <div id="remStudentDiv">
      <button type="button" id="remStudent" onClick={props.handleRemStudent}>
        - Student
      </button>
    </div>
  );
}

export default RemStudent;
