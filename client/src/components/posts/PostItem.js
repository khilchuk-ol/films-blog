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
        <div className="row container-lg">
          <h1 className="col-10">{item.title}</h1>{" "}
          {isEditable ? (
            <div className="col">
              <button
                type="button"
                className="btn"
                style={{
                  background: "#898989",
                  color: "#FFFF33",
                  fontSize: "larger",
                }}
              >
                Edit
                <Link
                  hidden
                  to={`/posts/edit/${item.id}`}
                  className="nav-link"
                  onClick={() => {
                    pushToHistory(`/posts/edit/${item.id}`);
                  }}
                />
              </button>

              <button
                type="button"
                className="btn btn-danger"
                style={{
                  fontSize: "larger",
                  float: "right",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    window.confirm(
                      "Are you sure you want to delete this post? It won't be available anymore"
                    )
                  ) {
                    removeItem(item.id);
                  }
                }}
              >
                Remove
              </button>
            </div>
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
