/*
 * File: addNewGuardian.js
 * Author: Athan Walker
 * Purpose: Provide a button that can add a new guardian to the registration
 *          form or profile page.
 */
function AddNewGuardian(props) {
  /*
   * 'handleAddGuardian' is a function passed from registration.js that
   * handles the event of this button being clicked.
   */
  return (
    <div id="addGuardianDiv">
      <button type="button" id="addGuardian" onClick={props.handleAddGuardian}>
        + New Guardian
      </button>
    </div>
  );
}

export default AddNewGuardian;
