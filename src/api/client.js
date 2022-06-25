import axios from "axios";

export default axios.create({
  // baseURL: process.env.VUE_APP_ROOT_API,
  baseURL: "https://mab00100.herokuapp.com/api/v1/",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});
