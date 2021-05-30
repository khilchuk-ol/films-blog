import axios from "axios";

const API_URL = "http://localhost:8080/api/img/";

class ImgService {
  async uploadImg(file) {
    let reader = new FileReader();

    reader.onloadend = (f) => {
      const formData = new FormData();
      formData.append("image", f);
      return axios.post(API_URL + "upload/users/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    };

    reader.readAsDataURL(file);
  }
}

export default new ImgService();
