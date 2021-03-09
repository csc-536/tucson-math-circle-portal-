function RemStudent(props) {
  return (
    <div id="remStudentDiv">
      <button type="button" id="remStudent" onClick={props.handleRemStudent}>
        - Student
      </button>
    </div>
  );
}

export default RemStudent;
