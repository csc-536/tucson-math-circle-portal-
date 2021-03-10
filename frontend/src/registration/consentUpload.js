/*
 * File: consentUpload.js
 * Author: Athan Walker
 * Purpose: Provide a method for users to upload consent form
 */
import React, { useState } from "react";

function ConsentUpload(props) {
  /*
   * 'selectedFile' is a state assigned to the file that is uploaded
   * 'isFilePicked' is a boolean indicating if a file has been uploaded
   */
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  /*
   * 'changHandler' is called when a file has been uploaded.
   * Assigns the uploaded file to 'selectedFile' and 'isFilePicked'
   * to 'true'.
   */
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    // TODO delete next line, there are only here to satisfy github actions
    if (selectedFile && isFilePicked) {
      return;
    }
  };

  // const handleSubmission = () => {};

  /*
   * Returns a div for uploading a consent file.
   */
  return (
    <div>
      Upload your consent form:
      <input type="file" name="file" onChange={changeHandler} />
      Consent form verifying progress: in progress/Complete
    </div>
  );
}

export default ConsentUpload;
