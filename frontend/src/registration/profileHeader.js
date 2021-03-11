/*
 * File: profileHeader.js
 * Author: Athan Walker
 * Purpose: Provide a header for the profile page.
 */
function ProfHeader(props) {
  /*
   * Returns a div containing the header of the profile page and a button
   * that returns to the meetings page.
   * 'handleSeeAllMeetings' is a function event handler passed through props
   * and can be found in 'registration.js'
   */
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
