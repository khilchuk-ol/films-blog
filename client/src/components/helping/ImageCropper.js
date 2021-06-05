import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import PropTypes from "prop-types";
import "../../styles/modal.css";

function ImageCropper(props) {
  const { state, setState } = props;
  let fileUrl;

  const closeModal = () => {
    setState((prev) => ({
      ...prev,
      display: "none",
    }));
  };

  const onImageLoaded = (image) => {
    setState((prev) => ({
      ...prev,
      imgFile: image,
    }));
  };

  const onCropFinish = (e) => {
    e.preventDefault();

    closeModal();
    props.onPhotoUpload(e);
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
      const img = new Image();
      img.src = state.src;
      const [croppedImageUrl, croppedImageFile] = await getCroppedImg(
        img,
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
        window.URL.revokeObjectURL(fileUrl);
        fileUrl = window.URL.createObjectURL(blob);
        resolve([fileUrl, blob]);
      }, "image/jpeg");
    });
  };

  return (
    <div>
      <div id="myModal" className="modal" style={{ display: state.display }}>
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
                onImageLoaded={onImageLoaded}
                onComplete={onCropComplete}
                onChange={onCropChange}
                style={{ width: "50%" }}
              />
            )}
            {state.croppedImageUrl && (
              <div>
                <img
                  alt="Crop"
                  style={{ maxWidth: "100%", padding: "1rem" }}
                  src={state.croppedImageUrl}
                />
              </div>
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

ImageCropper.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  onPhotoUpload: PropTypes.func.isRequired,
};

export default ImageCropper;
