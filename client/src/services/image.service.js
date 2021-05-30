import axios from "axios";

const API_URL = "http://localhost:8080/api/img/";

class ImgService {
  async uploadImg(file) {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(API_URL + "upload/users/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new ImgService();
