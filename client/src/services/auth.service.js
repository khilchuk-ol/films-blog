import axios from "axios";

const API_URL = "http://localhost:8080/api/users/";

class AuthService {
  async login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((res) => {
        if (res.data?.username) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }

        return res.data;
      });
  }

  async logout() {
    localStorage.removeItem("user");
    await axios.get(API_URL + "logout");
  }

  async register(username, email, password, picture) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password,
      picture,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
