function AddNewStudent(props) {
  return (
    <div id="addStudentDiv">
      <button type="button" id="addStudent" onClick={props.handleAddStudent}>
        + New Student
      </button>
    </div>
  );
}

export default AddNewStudent;
