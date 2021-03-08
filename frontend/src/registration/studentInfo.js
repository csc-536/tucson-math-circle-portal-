function StudentInfo(props) {
  return (
    <div id="studentInformation">
      <label className="col1">
        Preffered First Name:
        <input type="text" name="sFirstName" />
      </label>
      <label className="col2">
        Last Name:
        <input type="text" name="sLastName" />
      </label>
      <label className="col1">
        Grade:
        <input type="text" name="grade" />
      </label>
      <label className="col2">
        Age:
        <input type="text" name="age" />
      </label>
    </div>
  );
}

export default StudentInfo;
