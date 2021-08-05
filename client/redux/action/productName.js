import axiosInstance from "../../helper/axiosInstance";
import {
  CREATE_PRODUCT_NAME_FAILED,
  CREATE_PRODUCT_NAME_START,
  CREATE_PRODUCT_NAME_SUCCESS,
  GET_PRODUCT_NAME_FAILED,
  GET_PRODUCT_NAME_START,
  GET_PRODUCT_NAME_SUCCESS,
} from "./action.type";

const createProductNameStart = () => ({
  type: CREATE_PRODUCT_NAME_START,
});
const createProductNameSuccess = (product) => ({
  type: CREATE_PRODUCT_NAME_SUCCESS,
  payload: product,
});
const createProductNameFailed = (error) => ({
  type: CREATE_PRODUCT_NAME_FAILED,
  payload: error,
});

export const createProductName = (values, setValues, setOpen) => {
  return (dispatch) => {
    dispatch(createProductNameStart());

    axiosInstance
      .post("/item", values)
      .then((response) => {
        dispatch(createProductNameSuccess(response.data));
        setValues({ name: "" });
        setOpen(true);
      })
      .catch((err) => {
        setOpen(true);
        dispatch(createProductNameFailed(err.response?.data?.error));
      });
  };
};

const getProductNameStart = () => ({
  type: GET_PRODUCT_NAME_START,
});
const getProductNameSuccess = (product) => ({
  type: GET_PRODUCT_NAME_SUCCESS,
  payload: product,
});
const getProductNameFailed = (error) => ({
  type: GET_PRODUCT_NAME_FAILED,
  payload: error,
});

export const getProductName = () => {
  return (dispatch) => {
    dispatch(getProductNameStart());
    axiosInstance
      .get("/item")
      .then((response) => {
        dispatch(getProductNameSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getProductNameFailed(err.response.data.error));
      });
  };
};
