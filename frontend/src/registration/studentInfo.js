function StudentInfo(props) {
  return (
    <div id="studentInformation">
      <hr />
      <h3>Student Information</h3>
      <label className="col1">
        Name:
        <input type="text" name="sname" />
      </label>
      <label className="col2">
        Age:
        <input type="text" name="age" />
      </label>
      <label className="col1">
        Grade:
        <input type="text" name="grade" />
      </label>
      <label className="col2">
        Program Level:
        <br />
        <select>
          <option value="juniorA">Junior A</option>
          <option value="juniorB">Junior B</option>
          <option value="senior">Senior</option>
        </select>
      </label>
    </div>
  );
}

export default StudentInfo;
