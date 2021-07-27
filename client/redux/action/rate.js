import axiosInstance from "../../helper/axiosInstance";
import {
  GET_ALL_METAL_LIST_FOR_RATE_FAILED,
  GET_ALL_METAL_LIST_FOR_RATE_START,
  GET_ALL_METAL_LIST_FOR_RATE_SUCCESS,
  GET_RATE_FAILED,
  GET_RATE_START,
  GET_RATE_SUCCESS,
  UPDATE_RATE_FAILED,
  UPDATE_RATE_START,
  UPDATE_RATE_SUCCESS,
} from "./action.type";

const getAllMetalListForRateStart = () => ({
  type: GET_ALL_METAL_LIST_FOR_RATE_START,
});
const getAllMetalListForRateSuccess = (metal) => ({
  type: GET_ALL_METAL_LIST_FOR_RATE_SUCCESS,
  payload: metal,
});
const getAllMetalListForRateFailed = (error) => ({
  type: GET_ALL_METAL_LIST_FOR_RATE_FAILED,
  payload: error,
});

export const getAllMetalListForRate = () => {
  return (dispatch) => {
    dispatch(getAllMetalListForRateStart());
    axiosInstance
      .get("/metal/list")
      .then((response) => {
        dispatch(getAllMetalListForRateSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getAllMetalListForRateFailed(err.response?.data?.error));
      });
  };
};

const updateRateStart = () => ({
  type: UPDATE_RATE_START,
});

const updateRateSuccess = (rate) => ({
  type: UPDATE_RATE_SUCCESS,
  payload: rate,
});

const updateRateFailed = (error) => ({
  type: UPDATE_RATE_FAILED,
  payload: error,
});

export const updateRate = (values, close) => {
  return (dispatch) => {
    dispatch(updateRateStart());
    axiosInstance
      .put("/metal", values)
      .then((response) => {
        dispatch(updateRateSuccess(response.data));
        dispatch(getAllMetalListForRate());
        close();
      })
      .catch((err) => {
        dispatch(updateRateFailed(err.response.data.error));
      });
  };
};
