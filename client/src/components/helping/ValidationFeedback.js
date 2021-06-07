import React from "react";
import { FormFeedback } from "reactstrap";
import { isEmail } from "validator";

export const required = (value) => {
  if (!value) {
    return (
      <FormFeedback style={{ display: "block" }}>
        This field is required!
      </FormFeedback>
    );
  }
};

export const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <FormFeedback style={{ display: "block" }}>
        This is not a valid email.
      </FormFeedback>
    );
  }
};

export const validUsername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <FormFeedback style={{ display: "block" }}>
        The username must be between 3 and 20 characters.
      </FormFeedback>
    );
  }
};

export const validPasword = (value) => {
  if (value.search(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) === -1) {
    return (
      <FormFeedback style={{ display: "block" }}>
        The password must be at least 8 characters and it must contain at least
        one letter and one number.
      </FormFeedback>
    );
  }
};

export const fileImage = (value) => {
  console.log(value);
  if (value.type.search("image") === -1) {
    return (
      <FormFeedback style={{ display: "block" }}>
        The file must be an image.
      </FormFeedback>
    );
  }
};

export const wrapInFeedback = (msg) => {
  return <FormFeedback style={{ display: "block" }}>{msg}</FormFeedback>;
};
