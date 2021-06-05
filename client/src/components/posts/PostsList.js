import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostService from "../../services/post.service";
import PostItem from "./PostItem";

function PostsList(props) {
  const { isEditable } = props;
  const [state, setState] = useState({
    posts: [],
    page: 0,
    size: 20,
  });

  useEffect(() => {
    PostService.getAllPosts(state.page, state.size).then((res) => {
      setState((prev) => ({
        ...prev,
        posts: res.data.items,
      }));
    });
  }, [state.page]);

  const removePost = (id) => {
    PostService.deletePost(id).then((res) => {
      if (res.status === 200) {
        setState((prev) => ({
          ...prev,
          posts: prev.posts.splice(
            prev.posts.indexOf((p) => p.id === id),
            1
          ),
        }));
      }
    });
  };

  return (
    <div className="container-lg mt-3 p-3">
      {state.posts.map((p) => {
        return (
          <PostItem
            item={p}
            isEditable={isEditable}
            removeItem={removePost}
            key={`${p.id}`}
          />
        );
      })}
    </div>
  );
}

PostsList.propTypes = {
  isEditable: PropTypes.bool.isRequired,
};

export default PostsList;
