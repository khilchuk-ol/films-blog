import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Login from "./components/auth/Login.js";

function App() {
  const history = ["/"];
  return (
    <div className="App">
      <Login history={history}></Login>
    </div>
  );
}

export default App;
