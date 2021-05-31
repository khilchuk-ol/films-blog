import React from "react";

const Context = React.createContext({
  history: [],
  pushToHistory: (str) => history.push(str),
});

export default Context;
