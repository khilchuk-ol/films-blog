import React from "react";

import "../../styles/spinner.css";

export default function Spinner(props) {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
