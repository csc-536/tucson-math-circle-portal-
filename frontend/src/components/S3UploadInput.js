import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { uploadFile } from "../http";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
  })
);

const S3UploadInput = ({
  callback,
  uploadedFileName = "",
  disabled = false,
}) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(uploadedFileName);

  const handleFileOnChange = async (e) => {
    try {
      const objectKey = await uploadFile({
        selectedFile: e.target.files[0],
      });
      callback(objectKey);
      setSelectedFile(objectKey);
    } catch (error) {
      console.log(error);
    }
  };

  const id = uuidv4();
  return (
    <div>
      <input
        accept="application/pdf"
        className={classes.input}
        id={id}
        type="file"
        onChange={handleFileOnChange}
      />
      <label htmlFor={disabled ? "" : id}>
        <Button
          size="small"
          variant="contained"
          component="span"
          disableElevation
          disabled={disabled}
        >
          Upload
        </Button>
      </label>
    </div>
  );
};

export default S3UploadInput;
