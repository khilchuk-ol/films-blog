import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Context from "../../HistoryContext";
import postService from "../../services/post.service";

const PIC_FOLDER = "http://localhost:8080/images/users/";

function Post() {
  const { id } = useParams();
  const { pushToHistory } = useContext(Context);

  const [post, setPost] = useState({});

  useEffect(() => {
    postService.getOne(id).then((data) => {
      setPost(data);
    });
  }, []);

  return (
    <div className="container-lg mt-3 p-3 border" style={{ textAlign: "left" }}>
      {post}
    </div>
  );
}

export default Post;
