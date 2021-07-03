import axiosInstance from "../../helper/axiosInstance";
import Cookies from "js-cookie";
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (Cookies.get("role")) {
    return Cookies.get("role");
  } else {
    return false;
  }
};

export const signin = (user) => {
  return axiosInstance
    .post(`/signin`, user)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const setToken = (access, refresh, role) => {
  Cookies.set("access", access, {
    expires: 0.5 / 24,
  });
  Cookies.set("refresh", refresh);
  Cookies.set("role", role);
};

export const destoryToken = () => {
  Cookies.remove("access");
  Cookies.remove("refresh");
  Cookies.remove("role");
};
