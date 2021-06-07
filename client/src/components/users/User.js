import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import AuthService from "../../services/auth.service";
import userService from "../../services/user.service";
import PostsList from "../posts/PostsList";
import Context from "../../HistoryContext";

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
    if (!id || id === curr?.id) {
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
      <div className="container">
        <div className="row">
          <div className="col-2">
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
                width: "12rem",
              }}
            />
          </div>
          <div style={{ paddingLeft: "2rem" }} className="col">
            <div style={{ fontSize: "x-large" }}>{state.user.username}</div>
          </div>
          {state.isCurrentUser && (
            <div className="col-8" style={{ paddingRight: "1rem" }}>
              <Link
                to={`/profile/edit/`}
                className="nav-link"
                onClick={() => {
                  pushToHistory(`/profile/edit/`);
                }}
              >
                <button
                  type="button"
                  className="btn"
                  style={{
                    background: "#898989",
                    color: "#FFFF33",
                    fontSize: "larger",
                    height: "fit-content",
                    float: "right",
                  }}
                >
                  Edit
                </button>
              </Link>
            </div>
          )}
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
