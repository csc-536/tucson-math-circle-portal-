import React, { useState } from "react";

function ConsentUpload(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {};

  return (
    <div>
      Upload your consent form:
      <input type="file" name="file" onChange={changeHandler} />
      Consent form verifyuing progress: in progress/Complete
    </div>
  );
}

export default ConsentUpload;
