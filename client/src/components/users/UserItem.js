import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Context from "../../HistoryContext";

const PIC_FOLDER = "http://localhost:8080/images/users/";

function UserItem(props) {
  const { item } = props;
  const { pushToHistory } = useContext(Context);

  return (
    <Link
      to={`/users/${item.id}`}
      style={{ textAlign: "left", textDecoration: "none", color: "#898989" }}
      onClick={() => {
        pushToHistory(`/users/${item.id}`);
      }}
    >
      <div
        className="container-lg mt-3 p-3 border"
        style={{ display: "inline-flex" }}
      >
        <img
          src={PIC_FOLDER + item.picture}
          alt="profile-img"
          className="profile-img-card img-thumbnail"
          style={{
            padding: "0",
            borderRadius: "50%",
            borderColor: "#898989",
            borderWidth: "light",
            height: "5rem",
          }}
        />
        <div style={{ paddingLeft: "2rem", fontSize: "x-large" }}>
          {item.username}
        </div>
      </div>
    </Link>
  );
}

UserItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default UserItem;
