/*
 * File: remGuardian.js
 * Author: Athan Walker
 * Purpose: Provide a button that can remove a guardian from the registration
 *          form or profile page.
 */
function RemGuardian(props) {
  /*
   * 'handleRemGuardian' is a function passed from registration.js that
   * handles the event of this button being clicked.
   */
  return (
    <div id="remgGuardianDiv">
      <button type="button" id="remGuardian" onClick={props.handleRemGuardian}>
        - Guardian
      </button>
    </div>
  );
}

export default RemGuardian;
