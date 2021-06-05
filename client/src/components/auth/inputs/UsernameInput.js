import React from "react";
import { Input } from "reactstrap";
import PropTypes from "prop-types";

function UsernameInput(props) {
  const { state, setState, validations } = props;

  const onChangeUsername = (e) => {
    for (let validate of validations) {
      const feedback = validate(e.target.value);

      if (feedback) {
        setState((prev) => ({
          ...prev,
          username: e.target.value,
          isValid: false,
          feedback: feedback,
        }));

        return;
      }

      setState((prev) => ({
        ...prev,
        username: e.target.value,
        isValid: true,
        feedback: null,
      }));
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="username" style={{ color: "#898989", fontWeight: "500" }}>
        Username
      </label>
      <Input
        type="text"
        className="form-control"
        name="username"
        value={state.username}
        onChange={onChangeUsername}
        invalid={!state.isValid}
      />
      {!state.isValid && state.feedback}
    </div>
  );
}

UsernameInput.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  validations: PropTypes.arrayOf(PropTypes.func),
};

export default UsernameInput;
