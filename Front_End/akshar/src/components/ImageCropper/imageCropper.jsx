import React, { useState, useCallback } from "react";
import { withStyles } from "@material-ui/core/styles";
import Cropper from "react-easy-crop";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import getCroppedImg from "./cropImage";
import { styles } from "./style";
import ImageForm from "./ImageForm";

const ImageCropper = ({ inputImg, close, add }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [imageDetails, setImageDetails] = useState({
    name: "",
    description: "",
  });

  const style = {
    imgContainer: {
      position: "relative",
      flex: 1,
      padding: 16,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    img: {
      maxWidth: "100vw",
      maxHeight: "50vh",
    },
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const addImage = () => {
    console.log(imageDetails);
    console.log(imageDetails.description);
    add({
      image: croppedImage,
      description: imageDetails["description"],
      name: imageDetails["name"],
    });
  };

  const populateImageDetails = ({ imageDetails }) => {
    setImageDetails(imageDetails);
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(inputImg, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const onClose = useCallback(() => {
    setIsModalOpen(false);
    close();
  }, []);

  return (
    <Modal
      show={isModalOpen}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>Crop your Image</Modal.Header>
      <Modal.Body>
        {!croppedImage && (
          <div className="cropper" style={{ height: "55vh" }}>
            <Cropper
              image={inputImg}
              crop={crop}
              zoom={zoom}
              aspect={5 / 2}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
        )}
        {croppedImage && (
          <React.Fragment>
            <div style={style.imgContainer}>
              <img src={croppedImage} alt="Cropped" style={style.img} />
            </div>
            <ImageForm populateImageDetails={populateImageDetails}></ImageForm>
          </React.Fragment>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!croppedImage && (
          <Button onClick={showCroppedImage}>Preview and Save</Button>
        )}
        {croppedImage && (
          <Button onClick={() => setCroppedImage(null)}>Crop Again</Button>
        )}
        {croppedImage && <Button onClick={() => addImage()}>Save</Button>}
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const StyledDemo = withStyles(styles)(ImageCropper);
export default ImageCropper;
