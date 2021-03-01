import "./registration.css";
import AccInfo from "./accountInfo";
import CheckBox from "./checkBox";
import StudentInfo from "./studentInfo";
import ParentInfo from "./parentInfo";
import ConsentUpload from "./consentUpload";
import { useHistory } from "react-router";

function Registration(props) {
  let header = (
    <div>
      <h1>Account Registration Form</h1>
    </div>
  );
  let isUpdate = <CheckBox />;
  let buttonVal = "Register";

  const history = useHistory();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!props.update) {
      history.push("/");
    }
    // TODO: other stuff
  }

  if (props.update) {
    const handleSeeAllMeetings = () => {
      history.push("/meetings");
    }
    header = (
      <div>
        <h1 id="profileHeader">Profile</h1>
        <button type="button" id="allMeetings" onClick={handleSeeAllMeetings}>
          See All Meetings
        </button>
      </div>
    );
    isUpdate = <ConsentUpload />;
    buttonVal = "Update";
  }
  return (
    <form id="regForm" onSubmit={handleFormSubmit}>
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
