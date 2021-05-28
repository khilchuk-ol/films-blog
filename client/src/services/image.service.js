import axios from "axios";

const API_URL = "http://localhost:8080/api/img/";

class ImgService {
  async uploadImg(data) {
    return axios.post(API_URL + "upload/users/", data);
  }
}

export default new ImgService();
