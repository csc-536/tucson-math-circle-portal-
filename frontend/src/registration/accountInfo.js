function AccInfo(props) {
  return (
    <div id="accountInfo">
      <label>
        Email (for account, recieve meeting information):
        <input type="text" name="email" />
      </label>
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
}

export default AccInfo;
