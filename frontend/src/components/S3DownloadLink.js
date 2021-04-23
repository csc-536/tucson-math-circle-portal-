import React, { useEffect, useState } from "react";
import { downloadFile } from "../http";

const S3DownloadLink = ({ fileType, id, text }) => {
    console.log(id);
    const [url, setUrl] = useState("#");
    const [hasMaterial, setHasMaterial] = useState(false);
    useEffect(() => {
        const download = async () => {
            try {
                const urll = await downloadFile({
                    fileType,
                    id,
                });
                console.log(urll);
                setUrl(urll);
                setHasMaterial(true);
                // console.log(urll);
            } catch (error) {}
        };
        download();
    }, [id]);
    console.log(url);
    return <div>{hasMaterial ? <a href={url}>{text}</a> : ""}</div>;
};

export default S3DownloadLink;
