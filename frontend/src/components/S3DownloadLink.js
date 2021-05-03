import React, { useEffect, useState } from "react";
import { downloadFile } from "../http";

const S3DownloadLink = ({ fileType, id, text }) => {
  const [url, setUrl] = useState("#");
  const [hasMaterial, setHasMaterial] = useState(false);
  useEffect(() => {
    const download = async () => {
      try {
        const urll = await downloadFile({
          fileType,
          id,
        });
        setUrl(urll);
        setHasMaterial(true);
      } catch (error) {
        console.log(error.response);
      }
    };
    if (id) {
      download();
    }
  }, [id]);
  return <div>{hasMaterial ? <a href={url}>{text}</a> : ""}</div>;
};

export default S3DownloadLink;
