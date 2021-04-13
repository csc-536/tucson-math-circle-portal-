import React, { useState } from "react";
import { uploadFile } from "../http";

const S3UploadInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  // console.log(selectedFile);

  const handleFileOnChange = async (e) => {
    setSelectedFile(e.target.files[0]);
    // try {
    //     await uploadFile(e.target.files[0]);
    // } catch (error) {
    //     console.log(error);
    // }
  };

  async function handleUploadFile(e) {
    e.preventDefault();
    try {
      await uploadFile(selectedFile);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleUploadFile}>
        <input
          id="upload-image"
          type="file"
          accept="application/pdf"
          onChange={handleFileOnChange}
        />
        <input id="file-upload-button" type="submit" value="Upload" />
      </form>
    </div>
  );
};

export default S3UploadInput;
