import {
  GET_ALL_PRODUCT_FAILED,
  GET_ALL_PRODUCT_START,
  GET_ALL_PRODUCT_SUCCESS,
} from "./action.type";
import axiosInstance from "../../helper/axiosInstance";
const getAllProductStart = () => ({
  type: GET_ALL_PRODUCT_START,
});

const getAllProductFailed = (error) => ({
  type: GET_ALL_PRODUCT_FAILED,
  payload: error,
});

const getAllProductSuccess = (product) => ({
  type: GET_ALL_PRODUCT_SUCCESS,
  payload: product,
});

export const getAllProduct = (rowPerPage, page) => {
  return (dispatch) => {
    dispatch(getAllProductStart());
    axiosInstance
      .get(`/product?limit=${rowPerPage}&page=${page}`)
      .then((response) => {
        const { totalCount, product } = response.data;
        dispatch(
          getAllProductSuccess({ totalCount, product, rowPerPage, page })
        );
      })
      .catch((err) => {
        dispatch(getAllProductFailed(err.response.data.error));
      });
  };
};
