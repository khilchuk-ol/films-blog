import React, { useState } from "react";
import { Form } from "reactstrap";
import { Input } from "reactstrap";
import { Button } from "reactstrap";

import Spinner from "../helping/Spinner.js";
import AuthService from "../../services/auth.service.js";
import ImgService from "../../services/image.service.js";
import {
  required,
  validEmail,
  validPasword,
  validUsername,
  fileImage,
} from "./ValidationAlerts.js";

const PIC_FOLDER = "http://localhost:8080/images/users/";

function Register(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
    picture: "default.png",
    imageLoading: false,
    success: false,
    message: "",
  });

  let form = {};
  let fileForm = {};
  let checkBtn = {};

  const onChangeUsername = (e) => {
    setState((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  };

  const onChangePassword = (e) => {
    setState((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const onChangeEmail = (e) => {
    setState((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const onChangePicture = (e) => {
    setState((prev) => ({
      ...prev,
      imageLoading: true,
    }));

    const file = Array.from(e.target.files)[0];

    ImgService.uploadImg(file).then(
      (res) => {
        fileForm.value = res.data.fileName;

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
          message: resMsg,
          imageLoading: false,
          success: false,
        }));
      }
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setState((prev) => ({
      ...prev,
      success: false,
      message: "",
    }));

    form.validateAll();

    if (checkBtn.context._errors.length === 0) {
      AuthService.register(
        state.username,
        state.email,
        state.password,
        state.picture
      ).then(
        (res) => {
          setState((prev) => ({
            ...prev,
            message: res.data.message,
            success: true,
          }));
        },
        (err) => {
          const resMsg =
            err.response?.data?.message ?? err.message ?? err.toString();

          setState((prev) => ({
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
        <div style={{ paddingBottom: "1rem", paddingTop: "1rem" }}>
          {state.imageLoading ? (
            <Spinner />
          ) : (
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

              <input
                hidden
                id="fileInput"
                type="file"
                name="picture"
                onChange={onChangePicture}
                validations={[fileImage]}
                ref={(c) => {
                  fileForm = c;
                }}
              ></input>
            </span>
          )}
        </div>

        <Form
          onSubmit={handleRegister}
          ref={(c) => {
            form = c;
          }}
        >
          <div className="form-group">
            <label
              htmlFor="username"
              style={{ color: "#898989", fontWeight: "500" }}
            >
              Username
            </label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={state.username}
              onChange={onChangeUsername}
              validations={[required, validUsername]}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="email"
              style={{ color: "#898989", fontWeight: "500" }}
            >
              Email
            </label>
            <Input
              type="email"
              className="form-control"
              name="email"
              value={state.email}
              onChange={onChangeEmail}
              validations={[required, validEmail]}
            />
          </div>

          <div className="form-group" style={{ paddingBottom: "0.5rem" }}>
            <label
              htmlFor="password"
              style={{ color: "#898989", fontWeight: "500" }}
            >
              Password
            </label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={state.password}
              onChange={onChangePassword}
              validations={[required, validPasword]}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{ backgroundColor: "#898989" }}
            >
              <span>Register</span>
            </button>
          </div>

          {state.message && (
            <div className="form-group" style={{ paddingTop: "0.5rem" }}>
              <div
                className={
                  state.success ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {state.message}
              </div>
            </div>
          )}
          <Button
            style={{ display: "none" }}
            ref={(c) => {
              checkBtn = c;
            }}
          />
        </Form>
      </div>
    </div>
  );
}

export default Register;
