import React, { useContext, useState } from "react";
import { Form } from "reactstrap";

import { required } from "../helping/ValidationFeedback.js";
import AuthService from "../../services/auth.service.js";
import Context from "../../HistoryContext.js";

import UsernameInput from "../helping/inputs/UsernameInput.js";
import PasswordInput from "../helping/inputs/PasswordInput.js";

function Login() {
  const [formState, setFormState] = useState({
    loading: false,
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

  const { pushToHistory } = useContext(Context);

  const handleLogin = (e) => {
    e.preventDefault();

    setFormState((prev) => ({ ...prev, message: "", loading: true }));

    if (!usernameState.username || !passwordState.password) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        message: "Fields cannot be empty",
      }));
      return;
    }

    if (passwordState.isValid && usernameState.isValid) {
      AuthService.login(usernameState.username, passwordState.password).then(
        () => {
          pushToHistory("/profile");
          window.location.reload();
        },
        (err) => {
          let resMsg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

          if (resMsg.search("401") !== -1) {
            resMsg = "Incorrect username or password";
          }

          setFormState({
            loading: false,
            message: resMsg,
          });
        }
      );
    } else {
      setFormState((prev) => ({ ...prev, loading: false }));
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
        <Form onSubmit={handleLogin}>
          <UsernameInput
            state={usernameState}
            setState={setUsernameState}
            validations={[required]}
          />

          <PasswordInput
            state={passwordState}
            setState={setPasswordState}
            validations={[required]}
          />

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={formState.loading}
              style={{ backgroundColor: "#898989" }}
            >
              {formState.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {formState.message && (
            <div className="form-group" style={{ padding: "0.5rem" }}>
              <div className="alert alert-danger" role="alert">
                {formState.message}
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}

export default Login;
