function AccInfo(props) {
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
