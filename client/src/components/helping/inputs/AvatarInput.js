import React, { useState } from "react";
import PropTypes from "prop-types";

import ImgService from "../../../services/image.service.js";
import { wrapInFeedback } from "../../helping/ValidationFeedback.js";

import Spinner from "../../helping/Spinner.js";
import { Input } from "reactstrap";
import ImageCropper from "../../helping/ImageCropper.js";

const PIC_FOLDER = "http://localhost:8080/images/users/";

function AvatarInput(props) {
  const { state, setState, validations } = props;

  const [cropState, setCropState] = useState({
    display: "none",
    src: null,
    imgFile: null,
    crop: {
      unit: "%",
      width: 30,
      aspect: 16 / 16,
    },
  });

  const onChangePicture = (e) => {
    const file = Array.from(e.target.files)[0];

    for (let validate of validations) {
      const feedback = validate(file);

      if (feedback) {
        setState((prev) => ({
          ...prev,
          imageLoading: false,
          isValid: false,
          feedback: feedback,
        }));

        return;
      }

      setState((prev) => ({
        ...prev,
        isValid: true,
        feedback: null,
      }));

      const src = URL.createObjectURL(file);

      setCropState((prev) => ({
        ...prev,
        src,
        imgFile: file,
        display: "block",
      }));
    }
  };

  const uploadImage = () => {
    const file = cropState.croppedImageFile;

    setState((prev) => ({
      ...prev,
      imageLoading: true,
    }));

    setCropState({
      display: "none",
      src: null,
      imgFile: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 16 / 16,
      },
    });

    ImgService.uploadImg(file).then(
      (res) => {
        setState((prev) => ({
          ...prev,
          fileName: res.data.fileName,
          imageLoading: false,
        }));
      },
      (err) => {
        const resMsg =
          err.response?.data?.message ?? err.message ?? err.toString();

        setState((prev) => ({
          ...prev,
          imageLoading: false,
          isValid: false,
          feedback: wrapInFeedback(resMsg),
        }));
      }
    );
  };

  return (
    <div className="form-group">
      <div style={{ paddingBottom: "1rem", paddingTop: "1rem" }}>
        {state.imageLoading ? (
          <Spinner />
        ) : (
          <div>
            <span className="cursor-pointer">
              <label htmlFor="fileInput">
                <img
                  src={PIC_FOLDER + state.fileName}
                  alt="profile-img"
                  className="profile-img-card img-thumbnail"
                  style={{
                    padding: "0",
                    borderRadius: "50%",
                    borderColor: "#898989",
                    borderWidth: "medium",
                  }}
                />
              </label>

              <Input
                hidden
                accept="image/*"
                id="fileInput"
                type="file"
                name="picture"
                onChange={onChangePicture}
                invalid={!state.isValid}
              ></Input>
            </span>
            {!state.isValid && state.feedback}
          </div>
        )}
        <ImageCropper
          state={cropState}
          setState={setCropState}
          onPhotoUpload={uploadImage}
        />
      </div>
    </div>
  );
}

AvatarInput.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  validations: PropTypes.arrayOf(PropTypes.func),
};

export default AvatarInput;
