import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

import Context from "../../HistoryContext";
import AuthService from "../../services/auth.service";
import userService from "../../services/user.service";
import PostsList from "../posts/PostsList";

const PIC_FOLDER = "http://localhost:8080/images/users/";

function User() {
  const { id } = useParams();
  const { pushToHistory } = useContext(Context);

  const [state, setState] = useState({
    user: {},
    isCurrentUser: false,
  });

  useEffect(() => {
    const curr = AuthService.getCurrentUser();
    if (!id || id === curr.id) {
      setState((prev) => ({
        ...prev,
        isCurrentUser: true,
        user: curr,
      }));
    } else {
      userService.getOne(id).then((res) => {
        setState((prev) => ({
          ...prev,
          user: res.data.user,
        }));
      });
    }
  }, []);

  return (
    <div className="container-lg mt-3 p-3 border" style={{ textAlign: "left" }}>
      <div style={{ display: "inline-flex" }}>
        <img
          src={PIC_FOLDER + state.user.picture}
          alt="profile-img"
          className="profile-img-card img-thumbnail"
          style={{
            padding: "0",
            borderRadius: "50%",
            borderColor: "#898989",
            borderWidth: "light",
            height: "12rem",
          }}
        />
        <div style={{ paddingLeft: "2rem" }}>
          <div style={{ fontSize: "x-large" }}>{state.user.username}</div>
        </div>
      </div>
      <div>
        <PostsList
          isEditable={state.isCurrentUser}
          authorId={id ? id : state.user.id}
        />
      </div>
    </div>
  );
}

export default User;
