/*
 * File: consentUpload.js
 * Author: Athan Walker
 * Purpose: Provide a method for users to upload consent form
 */
import React, { useState } from "react";
import S3UploadInput from "../components/S3UploadInput";

function ConsentUpload({ fileHandler }) {
  const consentFormUploadCallback = (objectKey) => {
    console.log(objectKey);
  };

  /*
   * Returns a div for uploading a consent file.
   */
  return (
    <div id="cUpload">
      <S3UploadInput callback={consentFormUploadCallback} />
      {/* Upload your consent form (PDF):
      <input type="file" name="file" onChange={fileHandler} /> */}
    </div>
  );
}

export default ConsentUpload;
