import React from "react";
import { Input } from "reactstrap";
import PropTypes from "prop-types";

function PasswordInput(props) {
  const { state, setState, validations } = props;

  const onChangePassword = (e) => {
    for (let validate of validations) {
      const feedback = validate(e.target.value);

      if (feedback) {
        setState((prev) => ({
          ...prev,
          password: e.target.value,
          isValid: false,
          feedback: feedback,
        }));

        return;
      }

      setState((prev) => ({
        ...prev,
        password: e.target.value,
        isValid: true,
        feedback: null,
      }));
    }
  };

  return (
    <div className="form-group" style={{ paddingBottom: "0.5rem" }}>
      <label htmlFor="password" style={{ color: "#898989", fontWeight: "500" }}>
        Password
      </label>
      <Input
        type="password"
        className="form-control"
        name="password"
        value={state.password}
        onChange={onChangePassword}
        invalid={!state.isValid}
      />
      {!state.isValid && state.feedback}
    </div>
  );
}

PasswordInput.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  validations: PropTypes.arrayOf(PropTypes.func),
};

export default PasswordInput;
