import axiosInstance from "../../helper/axiosInstance";
import {
  CREATE_PRODUCT_NAME_FAILED,
  CREATE_PRODUCT_NAME_START,
  CREATE_PRODUCT_NAME_SUCCESS,
  DELETE_PRODUCT_NAME_FAILED,
  DELETE_PRODUCT_NAME_START,
  DELETE_PRODUCT_NAME_SUCCESS,
  GET_PRODUCT_NAME_FAILED,
  GET_PRODUCT_NAME_LIST_FAILED,
  GET_PRODUCT_NAME_LIST_START,
  GET_PRODUCT_NAME_LIST_SUCCESS,
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

const getProductNameListStart = () => ({
  type: GET_PRODUCT_NAME_LIST_START,
});

const getProductNameListSuccess = (data) => ({
  type: GET_PRODUCT_NAME_LIST_SUCCESS,
  payload: data,
});

const getProductNameListFailed = (error) => ({
  type: GET_PRODUCT_NAME_LIST_FAILED,
  payload: error,
});

export const getProductNameList = (rowPerPage, page) => {
  return (dispatch) => {
    dispatch(getProductNameListStart());
    axiosInstance
      .get(`/item/list?page=${page}&limit=${rowPerPage}`)
      .then((response) => {
        const { productName, totalCount } = response.data;
        dispatch(
          getProductNameListSuccess({
            rowPerPage,
            page,
            productName,
            totalCount,
          })
        );
      })
      .catch((err) => {
        dispatch(getProductNameListFailed(err.response.data.error));
      });
  };
};

const deleteProductNameStart = () => ({
  type: DELETE_PRODUCT_NAME_START,
});
const deleteProductNameSuccess = (data) => ({
  type: DELETE_PRODUCT_NAME_SUCCESS,
  payload: data,
});
const deleteProductNameFailed = (error) => ({
  type: DELETE_PRODUCT_NAME_FAILED,
  payload: error,
});

export const deleteProductName = (product) => {
  return (dispatch, getState) => {
    dispatch(deleteProductNameStart());
    const { productName } = getState();

    axiosInstance
      .delete("/item", { data: product })
      .then((response) => {
        dispatch(deleteProductNameSuccess(response.data));
        dispatch(
          getProductNameList(productName.list.rowPerPage, productName.list.page)
        );
      })
      .catch((err) => {
        dispatch(deleteProductNameFailed(err.response?.data?.error));
      });
  };
};
