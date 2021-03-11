/*
 * File: guardianInfo.js
 * Author: Athan Walker
 * Purpose: Provide a div for inputting guardian information
 */
function GuardianInfo(props) {
  /*
   * Return a div for inputting first and last name, email and phone number.
   */
  return (
    <div id="GuardianInformation">
      <label className="col1">
        First Name:
        <input type="text" name="pname" />
      </label>
      <label className="col2">
        Last Name:
        <input type="text" name="pname" />
      </label>
      <label className="col1">
        Guardian Email:
        <input type="email" name="pemail" />
      </label>
      <label className="col2">
        Phone:
        <input type="number" name="phone" />
      </label>
    </div>
  );
}

export default GuardianInfo;
