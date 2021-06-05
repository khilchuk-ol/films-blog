import axios from "axios";

const API_URL = "http://localhost:8080/api/posts/";

class PostService {
  async getAllPosts(page, size, title = null, authorId = null) {
    const filter = title ? { title, page, size } : { page, size };
    if (authorId) {
      filter.author = authorId;
    }
    return axios.get(API_URL + "", { params: filter });
  }

  async getOne(id) {
    return axios.get(API_URL + id);
  }

  async updatePost(post) {
    return axios.post(API_URL + `/edit/${post.id}`, post);
  }

  async deletePost(id) {
    return axios.post(API_URL + `/delete/${id}`);
  }
}

export default new PostService();
