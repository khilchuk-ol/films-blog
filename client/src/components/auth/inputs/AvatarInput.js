import React from "react";
import PropTypes from "prop-types";

import ImgService from "../../../services/image.service.js";
import { wrapInFeedback } from "../ValidationFeedback.js";

import Spinner from "../../helping/Spinner.js";
import { Input } from "reactstrap";

const PIC_FOLDER = "http://localhost:8080/images/users/";

function AvatarInput(props) {
  const { state, setState, validations } = props;

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
        imageLoading: true,
        isValid: true,
        feedback: null,
      }));
    }

    ImgService.uploadImg(file).then(
      (res) => {
        setState((prev) => ({
          ...prev,
          picture: res.data.fileName,
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
                  src={PIC_FOLDER + state.picture}
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
      </div>
    </div>
  );
}

AvatarInput.protoTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  validations: PropTypes.arrayOf(PropTypes.func),
};

export default AvatarInput;
