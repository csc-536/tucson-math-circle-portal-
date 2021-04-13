import React, { useEffect, useState } from "react";
import { downloadFile } from "../http";

const S3DownloadLink = ({ fileType, id, text }) => {
    const [url, setUrl] = useState("#");
    useEffect(() => {
        const download = async () => {
            try {
                const urll = await downloadFile({
                    fileType,
                    id,
                });
                setUrl(urll);
                // console.log(urll);
            } catch (error) {}
        };
        download();
    }, []);
    return (
        <div>
            <a href={url}>{text}</a>
        </div>
    );
};

export default S3DownloadLink;
