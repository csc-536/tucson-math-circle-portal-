function ParentInfo(props) {
  return (
    <div id="parentInformation">
      <hr />
      <h3>Parent Information</h3>
      <label className="col1">
        Name:
        <input type="text" name="pname" />
      </label>
      <label className="col2">
        Phone:
        <input type="text" name="phone" />
      </label>
      <label className="col1">
        Parent Email:
        <input type="text" name="pemail" />
      </label>
    </div>
  );
}

export default ParentInfo;
