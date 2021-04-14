/*
 * File: guardianInfo.js
 * Author: Athan Walker
 * Purpose: Provide a div for inputting guardian information
 */
function GuardianInfo({
  guardian: { first_name, last_name, email, phone_number },
  handleOnChange,
  handleRemGuardian,
}) {
  let remGuardianButton_1 = (
    <div id="studentRemoveDiv">
      <button type="button" id="remGuardian" onClick={handleRemGuardian}>
        <b>Remove Guardian</b>
      </button>
    </div>
  );

  /*
   * Return a div for inputting first and last name, email and phone number.
   */
  return (
    <div id="GuardianInformation">
      <label className="col1">
        First Name:
        <input
          type="text"
          name="first_name"
          onChange={handleOnChange}
          value={first_name}
          className="formInput"
        />
      </label>
      <label className="col2">
        Last Name:
        <input
          type="text"
          name="last_name"
          onChange={handleOnChange}
          value={last_name}
          className="formInput"
        />
      </label>
      <label className="col1">
        Guardian Email:
        <input
          type="email"
          name="email"
          onChange={handleOnChange}
          value={email}
          className="formInput"
        />
      </label>
      <label className="col2">
        Phone:
        <input
          type="text"
          name="phone_number"
          onChange={handleOnChange}
          value={phone_number}
          className="formInput"
        />
      </label>
      {remGuardianButton_1}
    </div>
  );
}

export default GuardianInfo;
