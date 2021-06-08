import React, { useState } from "react";
import { Form } from "reactstrap";
import PropTypes from "prop-types";

import {
  required,
  validEmail,
  validPasword,
  validUsername,
  fileImage,
} from "../helping/ValidationFeedback";
import UsernameInput from "../helping/inputs/UsernameInput";
import PasswordInput from "../helping/inputs/PasswordInput.js";
import EmailInput from "../helping/inputs/EmailInput.js";
import AvatarInput from "../helping/inputs/AvatarInput.js";
import UserService from "../../services/user.service.js";
import AuthService from "../../services/auth.service.js";

function EditUser() {
  const user = AuthService.getCurrentUser();

  const [formState, setFormState] = useState({
    success: false,
    message: "",
  });

  const [usernameState, setUsernameState] = useState({
    username: user.username,
    isValid: true,
    feedback: null,
  });

  const [passwordState, setPasswordState] = useState({
    password: "",
    isValid: true,
    feedback: null,
  });

  const [emailState, setEmailState] = useState({
    email: user.email,
    isValid: true,
    feedback: null,
  });

  const [pictureState, setPictureState] = useState({
    fileName: user.picture,
    imageLoading: false,
    isValid: true,
    feedback: null,
  });

  const parseErrorMsg = (err, msg) => {
    if (msg && msg.search("E11000") !== -1) {
      let field = msg.slice(msg.search("{") + 2);
      field = field.slice(0, field.search(":"));

      return `Oops, it seems user with such ${field} has already been registered. Try choosing new ${field}`;
    }

    return err.response.statusText;
  };

  const handleEdit = (e) => {
    e.preventDefault();

    setFormState((prev) => ({
      ...prev,
      success: false,
      message: "",
    }));

    if (
      !usernameState.username ||
      !emailState.email ||
      !passwordState.password
    ) {
      setFormState((prev) => ({
        ...prev,
        success: false,
        message: "Fields cannot be empty",
      }));
      return;
    }

    if (usernameState.isValid && passwordState.isValid && emailState.isValid) {
      const newUser = {
        id: user.id,
        username: usernameState.username,
        email: emailState.email,
        password: passwordState.password,
        picture: pictureState.fileName,
      };

      UserService.updateUser(newUser).then(
        (res) => {
          setFormState((prev) => ({
            ...prev,
            message: "Your account has been edited",
            success: true,
          }));
        },
        (err) => {
          const resMsg =
            err.response?.data?.message ?? err.message ?? err.toString();

          setFormState((prev) => ({
            ...prev,
            message: parseErrorMsg(err, resMsg),
          }));
        }
      );
    }
  };

  return (
    <div className="col-md-12" style={{ paddingTop: "9rem" }}>
      <div
        className="card card-container mx-auto"
        style={{
          width: "20rem",
          padding: "0.5rem",
          backgroundColor: "#FFFF33",
        }}
      >
        <Form onSubmit={handleEdit}>
          <AvatarInput
            state={pictureState}
            setState={setPictureState}
            validations={[fileImage]}
          />

          <UsernameInput
            state={usernameState}
            setState={setUsernameState}
            validations={[required, validUsername]}
          />

          <EmailInput
            state={emailState}
            setState={setEmailState}
            validations={[required, validEmail]}
          />

          <PasswordInput
            state={passwordState}
            setState={setPasswordState}
            validations={[required, validPasword]}
          />

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{ backgroundColor: "#898989" }}
            >
              <span>Save</span>
            </button>
          </div>

          {formState.message && (
            <div className="form-group" style={{ paddingTop: "0.5rem" }}>
              <div
                className={
                  formState.success
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {formState.message}
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}

export default EditUser;
