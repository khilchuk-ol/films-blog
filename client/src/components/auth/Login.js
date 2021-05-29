import React, { useState } from "react";
import { Form } from "reactstrap";
import { Input } from "reactstrap";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

import { required } from "./ValidationAlerts.js";
import AuthService from "../../services/auth.service.js";

function Login(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    loading: false,
    message: "",
  });

  let form = {};
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

  const handleLogin = (e) => {
    e.preventDefault();

    setState((prev) => ({ ...prev, message: "", loading: true }));
    form.validateAll();

    if (checkBtn.context._errors.length === 0) {
      AuthService.login(state.username, state.password).then(
        () => {
          props.history.push("/profile");
          //window.location.reload();
        },
        (err) => {
          const resMsg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

          setState((prev) => ({ ...prev, loading: false, message: resMsg }));
        }
      );
    } else {
      setState((prev) => ({ ...prev, loading: false }));
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
        <Form
          onSubmit={handleLogin}
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
              validations={[required]}
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
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={state.loading}
              style={{ backgroundColor: "#898989" }}
            >
              {state.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {state.message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
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

Login.protoTypes = {
  history: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Login;
