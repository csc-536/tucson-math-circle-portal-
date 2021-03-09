function AddNewGuardian(props) {
  return (
    <div id="addGuardianDiv">
      <button type="button" id="addGuardian" onClick={props.handleAddGuardian}>
        + New Guardian
      </button>
    </div>
  );
}

export default AddNewGuardian;
