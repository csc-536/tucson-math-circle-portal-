import "./registration.css";
import AccInfo from "./accountInfo";
import CheckBox from "./checkBox";
import StudentInfo from "./studentInfo";
import ParentInfo from "./parentInfo";
import ConsentUpload from "./consentUpload";

function Registration(props) {
  let header = (
    <div>
      <h1>Account Registration Form</h1>
    </div>
  );
  let isUpdate = <CheckBox />;
  let buttonVal = "Register";
  if (props.update) {
    header = (
      <div>
        <h1 id="profileHeader">Profile</h1>
        <button type="button" id="allMeetings">
          See All Meetings
        </button>
      </div>
    );
    isUpdate = <consentUpload />;
    buttonVal = "Update";
  }
  return (
    <form id="regForm">
      {header}
      <AccInfo update={props.update} />
      {isUpdate}
      <StudentInfo />
      <ParentInfo />
      <input id="regButton" type="submit" value={buttonVal} />
    </form>
  );
}

export default Registration;
