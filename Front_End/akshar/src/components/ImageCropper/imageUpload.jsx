// ImageUpload.js

import React, { useState } from "react";
import ImageCropper from "./imageCropper";
import { withStyles } from "@material-ui/core/styles";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// import "filepond/dist/filepond.min.css";
import { styles } from "./style";
import "./uploader.css";

import addImageIcon from "./../../Assets/addImageIcon.png";

// registerPlugin(FilePondPluginImagePreview);

const ImageUpload = ({ add }) => {
  const [blob, setBlob] = useState(null);
  const [inputImg, setInputImg] = useState("");
  const [imgName, setImgName] = useState("");

  const getBlob = (blob) => {
    // pass blob up from the ImageCropper component
    setBlob(blob);
  };

  const onInputChange = (e) => {
    const file = e.target.files[0];
    setInputImg(URL.createObjectURL(file));
    setImgName(file.name);
  };

  const closeModal = () => {
    setInputImg("");
  };

  const handleClick = (event) => {
    const { target = {} } = event || {};
    target.value = "";
  };

  const addImage = (image) => {
    add(image, imgName);
    closeModal();
  };

  return (
    <React.Fragment>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={onInputChange}
          onClick={handleClick}
          style={{ display: "none" }}
          id="file-input"
        />
      </div>
      {inputImg && (
        <ImageCropper
          getBlob={getBlob}
          inputImg={inputImg}
          close={closeModal}
          add={addImage}
        />
      )}
    </React.Fragment>
  );
};

const StyledDemo = withStyles(styles)(ImageUpload);

export default ImageUpload;
