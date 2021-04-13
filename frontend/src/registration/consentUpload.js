/*
 * File: consentUpload.js
 * Author: Athan Walker
 * Purpose: Provide a method for users to upload consent form
 */
import React, { useState } from "react";

function ConsentUpload({ fileHandler }) {
  /*
   * Returns a div for uploading a consent file.
   */
  return (
    <div id="cUpload">
      Upload your consent form (PDF):
      <input type="file" name="file" onChange={fileHandler} />
    </div>
  );
}

export default ConsentUpload;
