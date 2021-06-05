import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/App.css";
import HistoryContext from "./HistoryContext.js";
import Router from "./components/Router";
import authService from "./services/auth.service";
import Navbar from "./components/Navbar";

function App() {
  const currentUser = authService.getCurrentUser();
  const historyContext = {
    history: [],
    pushToHistory: (str) => {
      historyContext.history.push(str);
    },
  };

  return (
    <HistoryContext.Provider value={historyContext}>
      <div className="App">
        <HistoryContext.Consumer>
          {({ history, pushToHistory }) => (
            <Navbar pushToHistory={pushToHistory} currentUser={currentUser} />
          )}
        </HistoryContext.Consumer>

        <Router />
      </div>
    </HistoryContext.Provider>
  );
}

export default App;
