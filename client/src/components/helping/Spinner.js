import React from "react";

import "../../styles/spinner.css";

export default function Spinner(props) {
  return (
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
