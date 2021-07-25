import {
  ADD_NEW_METAL_TAG_START,
  ADD_NEW_METAL_TAG_FAILED,
  ADD_NEW_METAL_TAG_SUCCESS,
  GET_ALL_PRODUCT_FAILED,
  GET_ALL_PRODUCT_START,
  GET_ALL_PRODUCT_SUCCESS,
  GET_METAL_FOR_TAG_FAILED,
  GET_METAL_FOR_TAG_START,
  GET_METAL_FOR_TAG_SUCCESS,
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

const getMetalForTagStart = () => ({
  type: GET_METAL_FOR_TAG_START,
});
const getMetalForTagSuccess = (metal) => ({
  type: GET_METAL_FOR_TAG_SUCCESS,
  payload: metal,
});
const getMetalForTagFailed = (error) => ({
  type: GET_METAL_FOR_TAG_FAILED,
  payload: error,
});

export const getMetalForTag = () => {
  return (dispatch) => {
    dispatch(getMetalForTagStart());

    axiosInstance
      .get("/metal")
      .then((response) => {
        dispatch(getMetalForTagSuccess(response.data.metals));
      })
      .catch((err) => {
        dispatch(getMetalForTagFailed(err));
      });
  };
};

const addNewMetalTagStart = () => ({
  type: ADD_NEW_METAL_TAG_START,
});
const addNewMetalTagSuccess = (tag) => ({
  type: ADD_NEW_METAL_TAG_SUCCESS,
  payload: tag,
});
const addNewMetalTagFailed = (error) => ({
  type: ADD_NEW_METAL_TAG_FAILED,
  payload: error,
});

export const addNewMetalTag = (values, setValues, setOpen) => {
  return (dispatch) => {
    dispatch(addNewMetalTagStart());

    axiosInstance
      .post("/tag/metal", values)
      .then((response) => {
        dispatch(addNewMetalTagSuccess(response.data));
        setOpen(true);
        setValues({
          name: "",
          tag: "",
          metal: "",
          hsn: "",
          gst: "",
          labour: "",
          labourOn: "",
        });
      })
      .catch((err) => {
        if (err.response?.data?.error) {
          setOpen(true);
        }
        dispatch(addNewMetalTagFailed(err.response?.data?.error));
      });
  };
};
