import "./registration.css";
import AccInfo from "./accountInfo";
import CheckBox from "./checkBox";
import StudentInfo from "./studentInfo";
import ParentInfo from "./parentInfo";

function Registration(props) {
  return (
    <form>
      <h1>Account Registration Form</h1>
      <AccInfo />
      <CheckBox />
      <StudentInfo />
      <ParentInfo />
      <input id="reg" type="submit" value="Register" />
    </form>
  );
}

export default Registration;
