import axios from "axios";

import authService from "./auth.service.js";

const API_URL = "http://localhost:8080/api/users/";

class UserService {
  async getAllUsers(username, page, size) {
    return axios.get(
      API_URL + "",
      username ? { username, page, size } : { page, size }
    );
  }

  async getOne(id) {
    return axios.get(API_URL + id);
  }

  async updateUser(user) {
    return axios.post(API_URL + `/edit/${id}`, user);
  }

  async deleteCurrentUser() {
    const id = authService.getCurrentUser().id;
    localStorage.removeItem("user");
    return axios.post(API_URL + `/delete/${id}`);
  }
}

export default new UserService();
