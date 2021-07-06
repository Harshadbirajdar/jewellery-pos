import {
  ADD_PRODUCT_FAILED,
  ADD_PRODUCT_START,
  ADD_PRODUCT_SUCCESS,
  GET_METAL_LIST_FAILED,
  GET_METAL_LIST_START,
  GET_METAL_LIST_SUCCESS,
} from "./action.type";
import axiosInstance from "../../helper/axiosInstance";
const getMetalListStart = () => ({
  type: GET_METAL_LIST_START,
});

const getMetalListSuccess = (metals) => ({
  type: GET_METAL_LIST_SUCCESS,
  payload: metals,
});

const getMetalListFailed = (err) => ({
  type: GET_METAL_LIST_FAILED,
  payload: err,
});

export const getMetalList = () => {
  return (dispatch) => {
    dispatch(getMetalListStart());
    axiosInstance
      .get("/metal/list")
      .then((response) => {
        dispatch(getMetalListSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getMetalListFailed(err.response.data.error));
      });
  };
};

const addProductStart = () => ({
  type: ADD_PRODUCT_START,
});

const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

const addProductFailed = (error) => ({
  type: ADD_PRODUCT_FAILED,
  payload: error,
});

export const addProduct = (values, setValues, setProduct) => {
  return (dispatch) => {
    dispatch(addProductStart());
    axiosInstance
      .post("/product", values)
      .then((response) => {
        dispatch(addProductSuccess(response.data));
        setValues([]);
        setProduct({
          name: "",
          metal: "",
          shortName: "",
          hsn: "",
          gst: "",
          grossWt: "",
          netWt: "",
          labour: "",
          labourOn: "",
          qty: "",
        });
      })
      .catch((err) => {
        dispatch(addProductFailed(err.response.data.error));
      });
  };
};
