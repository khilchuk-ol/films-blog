import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/App.css";
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import HistoryContext from "./HistoryContext.js";

function App() {
  const [history, setHistory] = useState([]);
  const historyContext = {
    history,
    pushToHistory: (str) => {
      setHistory((prev) => prev.push(str));
    },
  };
  return (
    <HistoryContext.Provider value={historyContext}>
      <div className="App">
        <HistoryContext.Consumer>
          {({ history, pushToHistory }) => (
            <Login pushToHistory={pushToHistory}></Login>
          )}
        </HistoryContext.Consumer>
        {/*<Register />*/}
      </div>
    </HistoryContext.Provider>
  );
}

export default App;
