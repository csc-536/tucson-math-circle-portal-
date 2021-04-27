/*
 * File: registrationHeader.js
 * Author: Athan Walker
 * Purpose: Provide a header for a registration form.
 */
function RegHeader(props) {
  /*
   * Returns a div containing the registration form header.
   */
  return (
    <div>
      <h1>Account Registration Form</h1>
      <p className="regNote">
        NOTE: MUST <b>FILL IN ALL FIELDS BELOW</b> TO REGISTER
      </p>
    </div>
  );
}

export default RegHeader;
