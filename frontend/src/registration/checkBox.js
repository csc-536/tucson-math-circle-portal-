/*
 * File: checkBox.js
 * Author: Athan Walker
 * Purpose: Provide a checkbox for the registration form regarding user
 *          consent
 */

function CheckBox({ handleCheckBoxChange }) {
  /*
   * Returns the checkbox and text
   */
  return (
    <div id="checkbox">
      <input type="checkbox" id="myCheckBox" onClick={handleCheckBoxChange} />
      <p>
        I understand that guardians need to sign a consent form for each student
        after registration
      </p>
    </div>
  );
}

export default CheckBox;
