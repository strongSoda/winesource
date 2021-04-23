import React, { useState } from 'react';
/* AWS S3 Client */
/* uploadFile.ts */
import ReactS3Client from 'react-aws-s3-typescript';
import { s3Config } from 'global/constants/s3Config';

import { UploadImageWrapper } from './UploadImage.styles';

declare interface IUploadImageProps {
  dir: string,
  setImgUrl: React.Dispatch<React.SetStateAction<string>>,
}

const UploadImage: React.FC<IUploadImageProps> = (props: IUploadImageProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false)
   const handleFileInput = (e: any) => {
        setSelectedFile(e.target.files[0]);
   }
  
  const upload = async (selectedFile: File | null) => {
    if (!selectedFile) {
      alert("No image selected")
      return
    }

    setLoading(true)
        /* Import s3 config object and call the constrcutor */
    // const s3 = new ReactS3Client(s3Config);

    /* You can use the default directory defined in s3Config object
    * Or you can a define custom directory to upload when calling the
    * constructor using js/ts object destructuring.
    * 
    * */
    const s3 = new ReactS3Client({
        ...s3Config,
        dirName: props.dir
    });

    // const filename = 'filename-to-be-uploaded';     /* Optional */

    /* If you do not specify a file name, file will be uploaded using uuid generated 
    * by short-UUID (https://www.npmjs.com/package/short-uuid)
    */

    try {
      // @ts-ignore
        const res = await s3.uploadFile(selectedFile);
      props.setImgUrl(res.location)
      alert("File Uploaded")
        /*
        * {
        *   Response: {
        *     bucket: "bucket-name",
        *     key: "directory-name/filename-to-be-uploaded",
        *     location: "https:/your-aws-s3-bucket-url/directory-name/filename-to-be-uploaded"
        *   }
        * }
        */
    } catch (exception) {
        console.log(exception);
        /* handle the exception */
    }

    setLoading(false)
  } 
  return (
    <UploadImageWrapper data-testid="UploadImage">
        <input className="fileSelector" type="file" accept="image/*" onChange={handleFileInput}/>
        <button type="button" onClick={() => upload(selectedFile)}>{loading?'Uploading...':'Upload'}</button>
    </UploadImageWrapper>
  )
};

export default UploadImage;
