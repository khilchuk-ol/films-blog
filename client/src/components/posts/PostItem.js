import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Context from "../../HistoryContext";

function PostItem(props) {
  const { item, isEditable, removeItem } = props;
  const { pushToHistory } = useContext(Context);

  return (
    <Link
      to={`/posts/${item.id}`}
      style={{ textAlign: "left", textDecoration: "none", color: "#898989" }}
      onClick={() => {
        pushToHistory(`/posts/${item.id}`);
      }}
    >
      <div className="container-lg mt-3 p-3 border">
        <div className="row container-lg" style={{ display: "inline-flex" }}>
          <h1 className="col">{item.title}</h1>{" "}
          {isEditable ? (
            <button
              type="button"
              className="col-sm"
              style={{
                fontSize: "xxx-large",
                color: "red",
                background: "none",
                textAlign: "right",
                padding: 0,
                height: "32px",
              }}
              onClick={() => {
                removeItem(item.id);
              }}
            >
              &times;
            </button>
          ) : null}
        </div>
        <Link
          to={`/users/${item.author._id}`}
          className="link"
          onClick={() => {
            pushToHistory(`/users/${item.author._id}`);
          }}
        >
          {item.author.username}
        </Link>
        <p>{item.description}</p>
        <p
          style={{
            paddingTop: "1rem",
          }}
        >
          {new Date(item.date).toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

PostItem.propTypes = {
  item: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  removeItem: PropTypes.func,
};

export default PostItem;
