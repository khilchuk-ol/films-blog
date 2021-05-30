import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import PropTypes from "prop-types";
import "../../styles/modal.css";

const PIC_FOLDER = "http://localhost:8080/images/users/";

function ImageCropper(props) {
  const { state, setState } = props;
  let modal;

  const closeModal = () => {
    setState((prev) => ({
      ...prev,
      display: "none",
    }));
  };

  const onCropFinish = (e) => {
    closeModal();
    props.onPhotoUpload(e);
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      setState((prev) => ({
        ...prev,
        display: "none",
      }));
    }
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    setState((prev) => ({
      ...prev,
      crop,
    }));
  };

  const makeClientCrop = async (crop) => {
    if (state.imgFile && crop.width && crop.height) {
      const [croppedImageUrl, croppedImageFile] = await getCroppedImg(
        state.imgFile,
        crop,
        "newFile.jpeg"
      );

      setState((prev) => ({
        ...prev,
        croppedImageUrl,
        croppedImageFile,
      }));
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve([this.fileUrl, blob]);
      }, "image/jpeg");
    });
  };

  return (
    <div>
      <div id="myModal" className="modal" display={state.display}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div className="App">
            {state.src && (
              <ReactCrop
                src={state.src}
                crop={state.crop}
                ruleOfThirds
                onComplete={onCropComplete}
                onChange={onCropChange}
              />
            )}
            {state.croppedImageUrl && (
              <img
                alt="Crop"
                style={{ maxWidth: "100%" }}
                src={state.croppedImageUrl}
              />
            )}

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                style={{ backgroundColor: "#898989" }}
                onClick={onCropFinish}
              >
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ImageCropper.protoTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  onPhotoUpload: PropTypes.func.isRequired,
};

export default ImageCropper;
