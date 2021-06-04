import React from "react";

const Context = React.createContext({
  history: [],
  pushToHistory: (str) => this.history.push(str),
});

export default Context;
