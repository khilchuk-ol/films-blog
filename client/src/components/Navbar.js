import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PIC_FOLDER = "http://localhost:8080/images/users/";

function Navbar(props) {
  const { pushToHistory, currentUser } = props;
  return (
    <nav className="navbar navbar-expand navbar-gray">
      <a
        href="/posts"
        className="navbar-brand yellow-link"
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
            className="yellow-link nav-link"
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
            className="yellow-link nav-link"
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
          className="navbar-nav mr-auto"
          style={{
            position: "absolute",
            right: "0",
            paddingRight: "3rem",
          }}
        >
          <Link
            to={"/add"}
            className="yellow-link nav-link nav-item"
            style={{
              paddingRight: "1rem",
            }}
            onClick={() => {
              pushToHistory("/add");
            }}
          >
            Add post
          </Link>
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
  );
}

Navbar.propTypes = {
  pushToHistory: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default Navbar;
