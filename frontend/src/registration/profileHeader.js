function ProfHeader(props) {
  return (
    <div>
      <h1 id="profileHeader">Profile</h1>
      <button
        type="button"
        id="allMeetings"
        onClick={props.handleSeeAllMeetings}
      >
        See All Meetings
      </button>
    </div>
  );
}

export default ProfHeader;
