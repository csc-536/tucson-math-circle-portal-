function RemGuardian(props) {
  return (
    <div id="remgGuardianDiv">
      <button type="button" id="remGuardian" onClick={props.handleRemGuardian}>
        - Guardian
      </button>
    </div>
  );
}

export default RemGuardian;
