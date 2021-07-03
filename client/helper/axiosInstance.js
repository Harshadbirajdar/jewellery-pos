import axios from "axios";
import { API } from "../config";
import Cookies from "js-cookie";
import router from "next/router";
import { setToken } from "../components/api";

const axiosInstance = axios.create({
  baseURL: API,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    axios.interceptors.response.eject(axiosInstance);

    if (error.response.status === 401) {
      if (!Cookies.get("refresh")) {
        router.push("/signin");
        return "";
      }

      return axios
        .post(`${API}/token`, { token: Cookies.get("refresh") })
        .then((response) => {
          const { accessToken, refershToken, role } = response.data;
          setToken(accessToken, refershToken, role);

          error.response.config.headers["Authorization"] =
            "Bearer " + accessToken;

          return axios.request(error.response.config);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
);

axiosInstance.interceptors.request.use((config) => {
  let token = Cookies.get("access");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
