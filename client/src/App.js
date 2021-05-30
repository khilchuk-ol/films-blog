import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/App.css";
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import Context from "./context.js";

function App() {
  return (
    <Context.Provider value={{ history: [] }}>
      <div className="App">
        <Register></Register>
      </div>
    </Context.Provider>
  );
}

export default App;
