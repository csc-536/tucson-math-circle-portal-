/*
 * Author: Athan Walker
 * File: accountInfo.js
 * Purpose: Provide the first section of the registration and profile pages.
 *          This section captures the account Email, Password and uploaded
 *          consent form.
 */
function AccInfo(props) {
  /*
   * Assigns 'passwords' to a div containing a new password and conformation
   * of password input fields.
   */
  let passwords = (
    <div>
      <label id="password" className="col1">
        Password:
        <input type="password" name="password" />
      </label>
      <label id="re-password" className="col2">
        Enter Password Again:
        <input type="password" name="re-password" />
      </label>
    </div>
  );

  /*
   * If the property 'update' is 'true' then assign 'passwords' to a div
   * containing a new password input field.
   */
  if (props.update) {
    passwords = (
      <div>
        <label id="password" className="col1">
          New Password:
          <input type="password" name="password" />
        </label>
      </div>
    );
  }

  /*
   * Returns a div containing an email input field and the JSX 'passwords'
   */
  return (
    <div id="accountInfo">
      <label>
        Email (for account, recieve meeting information):
        <input type="text" name="email" />
      </label>
      {passwords}
    </div>
  );
}

export default AccInfo;
