import Modal from "@material-ui/core/Modal";
import S3DownloadLink from "../components/S3DownloadLink";

function MoreInfo({ sInfoTag, sInfo, student, account }) {
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth() + 1;

  const calcAge = () => {
    let age = currYear - student["birth_year"];
    if (currMonth < student["birth_month"]) {
      age--;
    }
    return age;
  };

  return (
    <div>
      <h1>Student Info</h1>
      <h4 className={sInfoTag}>First Name:</h4>
      <p className={sInfo}>{student["first_name"]}</p>
      <h4 className={sInfoTag}>Last Name:</h4>
      <p className={sInfo}>{student["last_name"]}</p>
      <h4 className={sInfoTag}>Grade:</h4>
      <p className={sInfo}>{student["grade"]}</p>
      <h4 className={sInfoTag}>Birth Month/Year:</h4>
      <p className={sInfo}>
        {student["birth_month"]}/{student["birth_year"]}
      </p>
      <h4 className={sInfoTag}>Age Estimate:</h4>
      <p className={sInfo}>{calcAge()}</p>
      <h4 className={sInfoTag}>Consent Form</h4>
      <p className={sInfo}>
        <S3DownloadLink fileType="consent" id={student["id"]} text="Download" />
      </p>
      <hr />
      <h1>Guardian Info</h1>
      {account["guardians"].map((guardian, i) => {
        return (
          <div>
            <h2>Guardian {i}</h2>
            <h4 className={sInfoTag}>First Name:</h4>
            <p className={sInfo}>{guardian["first_name"]}</p>
            <h4 className={sInfoTag}>Last Name:</h4>
            <p className={sInfo}>{guardian["last_name"]}</p>
            <h4 className={sInfoTag}>Email:</h4>
            <p className={sInfo}>{guardian["email"]}</p>
            <h4 className={sInfoTag}>Phone:</h4>
            <p className={sInfo}>{guardian["phone_number"]}</p>
            <hr />
          </div>
        );
      })}
      <h1>Account Info</h1>
      <h4 className={sInfoTag}>Account Email:</h4>
      <p className={sInfo}>{account["email"]}</p>
    </div>
  );
}

export default MoreInfo;
