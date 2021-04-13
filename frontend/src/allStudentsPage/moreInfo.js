import Modal from "@material-ui/core/Modal";
function MoreInfo({ sInfoTag, sInfo, student, account }) {
  return (
    <div>
      <h1>Student Info</h1>
      <h4 className={sInfoTag}>First Name:</h4>
      <p className={sInfo}>{student["first_name"]}</p>
      <h4 className={sInfoTag}>Last Name:</h4>
      <p className={sInfo}>{student["last_name"]}</p>
      <h4 className={sInfoTag}>Grade:</h4>
      <p className={sInfo}>{student["grade"]}</p>
      <h4 className={sInfoTag}>Age:</h4>
      <p className={sInfo}>{student["age"]}</p>
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
