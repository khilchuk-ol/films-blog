import React from "react";
import { isEmail } from "validator";

export const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

export const validUsername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

export const validPasword = (value) => {
  if (value.search(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) === -1) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be at least 8 characters and it must contain at least
        one letter and one number.
      </div>
    );
  }
};

export const fileImage = (value) => {
  if (value.type.search("image") === -1) {
    return (
      <div className="alert alert-danger" role="alert">
        The file must be an image.
      </div>
    );
  }
};
