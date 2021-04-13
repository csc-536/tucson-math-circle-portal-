import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { uploadFile } from "../http";

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

const S3UploadInput = ({ callback }) => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState("");

    const handleFileOnChange = async (e) => {
        console.log(e.target.files[0]);
        try {
            const objectKey = await uploadFile({
                selectedFile: e.target.files[0],
            });
            setSelectedFile(e.target.files[0].name);
            callback(objectKey);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <input
                accept="application/pdf"
                className={classes.input}
                id="upload-image"
                type="file"
                onChange={handleFileOnChange}
            />
            <label htmlFor="upload-image">
                <Button variant="contained" component="span" disableElevation>
                    Upload
                </Button>
            </label>
            <span>{selectedFile}</span>
        </div>
    );
};

export default S3UploadInput;
