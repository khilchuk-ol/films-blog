import React, { useState } from "react";
import { Form } from "reactstrap";

import AuthService from "../../services/auth.service.js";

import {
  required,
  validEmail,
  validPasword,
  validUsername,
  fileImage,
} from "./ValidationFeedback.js";
import UsernameInput from "./inputs/UsernameInput.js";
import PasswordInput from "./inputs/PasswordInput.js";
import EmailInput from "./inputs/EmailInput.js";
import AvatarInput from "./inputs/AvatarInput.js";

function Register(props) {
  const [formState, setFormState] = useState({
    success: false,
    message: "",
  });

  const [usernameState, setUsernameState] = useState({
    username: "",
    isValid: true,
    feedback: null,
  });

  const [passwordState, setPasswordState] = useState({
    password: "",
    isValid: true,
    feedback: null,
  });

  const [emailState, setEmailState] = useState({
    email: "",
    isValid: true,
    feedback: null,
  });

  const [pictureState, setPictureState] = useState({
    picture: "default.png",
    imageLoading: false,
    isValid: true,
    feedback: null,
  });

  const handleRegister = (e) => {
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
      AuthService.register(
        usernameState.username,
        emailState.email,
        passwordState.password,
        formState.picture
      ).then(
        (res) => {
          setFormState((prev) => ({
            ...prev,
            message: res.data.message,
            success: true,
          }));
        },
        (err) => {
          const resMsg =
            err.response?.data?.message ?? err.message ?? err.toString();

          setFormState((prev) => ({
            ...prev,
            message: resMsg,
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
        <Form onSubmit={handleRegister}>
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
              <span>Register</span>
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

export default Register;
