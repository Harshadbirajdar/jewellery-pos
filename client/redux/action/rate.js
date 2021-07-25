import axiosInstance from "../../helper/axiosInstance";
import {
  GET_ALL_METAL_LIST_FOR_RATE_FAILED,
  GET_ALL_METAL_LIST_FOR_RATE_START,
  GET_ALL_METAL_LIST_FOR_RATE_SUCCESS,
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

export const getAllMetalListForRate = (values, setValues) => {
  return (dispatch) => {
    dispatch(getAllMetalListForRateStart());
    axiosInstance
      .get("/metal")
      .then((response) => {
        dispatch(getAllMetalListForRateSuccess(response.data));
        setValues(response.data.metals);
      })
      .catch((err) => {
        dispatch(getAllMetalListForRateFailed(err.response?.data?.error));
      });
  };
};
