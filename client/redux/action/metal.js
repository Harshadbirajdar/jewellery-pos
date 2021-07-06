import axiosInstance from "../../helper/axiosInstance";

const {
  ADD_NEW_METAL_START,
  ADD_NEW_METAL_FAILED,
  ADD_NEW_METAL_SUCCESS,
  VIEW_ALL_METAL_START,
  VIEW_ALL_METAL_SUCCESS,
  VIEW_ALL_METAL_FAILED,
} = require("./action.type");

const addNewMetalStart = () => ({
  type: ADD_NEW_METAL_START,
});
const addNewMetalFailed = (error) => ({
  type: ADD_NEW_METAL_FAILED,
  payload: error,
});
const addNewMetalSuccess = (metal) => ({
  type: ADD_NEW_METAL_SUCCESS,
  payload: metal,
});

export const addNewMetal = (values, setValues, setOpen) => {
  return (dispatch) => {
    dispatch(addNewMetalStart());
    axiosInstance
      .post("/metal", values)
      .then((response) => {
        dispatch(addNewMetalSuccess(response.data));
        setValues({ name: "", purity: "" });
        setOpen(true);
      })
      .catch((err) => {
        setOpen(true);

        dispatch(addNewMetalFailed(err.response.data.error));
      });
  };
};

const viewAllMetalStart = () => ({
  type: VIEW_ALL_METAL_START,
});

const viewAllMetalSuccess = (metals) => ({
  type: VIEW_ALL_METAL_SUCCESS,
  payload: metals,
});

const viewAllMetalFailed = (error) => ({
  type: VIEW_ALL_METAL_FAILED,
  payload: error,
});

export const viewAllMetal = (rowPerPage, page) => {
  return (dispatch) => {
    dispatch(viewAllMetalStart());
    axiosInstance
      .get(`/metal?page=${page}&limit=${rowPerPage}`)
      .then((response) => {
        const { metals, totalCount } = response.data;
        dispatch(viewAllMetalSuccess({ metals, totalCount, rowPerPage, page }));
      })
      .catch((err) => {
        dispatch(viewAllMetalFailed(err.response.data.error));
      });
  };
};
