import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/App.css";
import HistoryContext from "./HistoryContext.js";
import Router from "./components/Router";
import authService from "./services/auth.service";

const PIC_FOLDER = "http://localhost:8080/images/users/";

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
            <nav className="navbar navbar-expand navbar-gray">
              <a
                href="/posts"
                className="navbar-brand"
                onClick={() => {
                  pushToHistory("/posts");
                }}
              >
                notRegularBlog
              </a>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link
                    to={"/posts"}
                    className="nav-link"
                    onClick={() => {
                      pushToHistory("/posts");
                    }}
                  >
                    Posts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"/users"}
                    className="nav-link"
                    onClick={() => {
                      pushToHistory("/users");
                    }}
                  >
                    Users
                  </Link>
                </li>
              </div>
              {currentUser ? (
                <div
                  style={{
                    position: "absolute",
                    right: "0",
                    paddingRight: "3rem",
                  }}
                >
                  <button id="profilePic" style={{ background: "none" }}>
                    <Link
                      to={"/profile"}
                      onClick={() => {
                        pushToHistory("/profile");
                      }}
                    >
                      <img
                        src={PIC_FOLDER + currentUser.picture}
                        alt="profile-img"
                        className="profile-img-card img-thumbnail"
                        style={{
                          padding: "0",
                          borderRadius: "50%",
                          borderColor: "#FFFF33",
                          borderWidth: "light",
                          height: "3.5rem",
                        }}
                      />
                    </Link>
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    right: "0",
                    paddingRight: "3rem",
                  }}
                >
                  <button
                    className="btn btn-primary btn-block nav-item"
                    style={{ backgroundColor: "#FFFF33" }}
                  >
                    <Link
                      to={"/login"}
                      className="nav-link"
                      style={{
                        color: "#898989",
                        fontWeight: "500",
                      }}
                      onClick={() => {
                        pushToHistory("/login");
                      }}
                    >
                      Log in
                    </Link>
                  </button>

                  <button
                    className="btn btn-primary btn-block nav-item"
                    style={{ backgroundColor: "#FFFF33", marginLeft: ".5rem" }}
                  >
                    <Link
                      to={"/register"}
                      className="nav-link"
                      onClick={() => {
                        pushToHistory("/register");
                      }}
                      style={{
                        color: "#898989",
                        fontWeight: "500",
                      }}
                    >
                      Register
                    </Link>
                  </button>
                </div>
              )}
            </nav>
          )}
        </HistoryContext.Consumer>

        <Router />
      </div>
    </HistoryContext.Provider>
  );
}

export default App;
