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
        <h1>{item.title}</h1>
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
          {item.date}
        </p>
        {isEditable ? (
          <button
            type="button"
            onClick={() => {
              removeItem(item.id);
            }}
          >
            &times;
          </button>
        ) : null}
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
