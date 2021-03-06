import React, { useState } from "react";
import { Form } from "reactstrap";

import AuthService from "../../services/auth.service.js";

import {
  required,
  validEmail,
  validPasword,
  validUsername,
  fileImage,
} from "../helping/ValidationFeedback.js";
import UsernameInput from "../helping/inputs/UsernameInput";
import PasswordInput from "../helping/inputs/PasswordInput.js";
import EmailInput from "../helping/inputs/EmailInput.js";
import AvatarInput from "../helping/inputs/AvatarInput.js";

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
    fileName: "default.png",
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

    return err.reponse.statusText;
  };

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
        pictureState.fileName
      ).then(
        (res) => {
          setFormState((prev) => ({
            ...prev,
            data: res.data,
            message: "Your account has been registered",
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
