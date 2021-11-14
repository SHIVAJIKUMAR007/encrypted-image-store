import axios from "axios";

const instance = axios.create({
  baseURL: "https://encrypt-image.herokuapp.com/",
});

export default instance;
