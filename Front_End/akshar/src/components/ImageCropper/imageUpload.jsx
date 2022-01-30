import React, { useState } from "react";
import ImageCropper from "./imageCropper";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./style";
import "./uploader.css";

const ImageUpload = ({ add }) => {
  const [inputImg, setInputImg] = useState("");
  const [imgName, setImgName] = useState("");

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
        <ImageCropper inputImg={inputImg} close={closeModal} add={addImage} />
      )}
    </React.Fragment>
  );
};

const StyledDemo = withStyles(styles)(ImageUpload);

export default ImageUpload;
