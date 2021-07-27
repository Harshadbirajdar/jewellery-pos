import axiosInstance from "../../helper/axiosInstance";

const {
  GET_ALL_CUSTOMER_START,
  GET_ALL_CUSTOMER_SUCCESS,
  GET_ALL_CUSTOMER_FAILED,
} = require("./action.type");

const getAllCustomerStart = () => ({
  type: GET_ALL_CUSTOMER_START,
});
const getAllCustomerSuccess = (customer) => ({
  type: GET_ALL_CUSTOMER_SUCCESS,
  payload: customer,
});
const getAllCustomerFailed = (error) => ({
  type: GET_ALL_CUSTOMER_FAILED,
  payload: error,
});

export const getAllCustomer = (rowPerPage, page) => {
  return (dispatch) => {
    dispatch(getAllCustomerStart());
    axiosInstance
      .get(`/customer/list?rowPerPage=${rowPerPage}&page=${page}`)
      .then((response) => {
        const { totalCount, customer } = response.data;
        dispatch(
          getAllCustomerSuccess({ totalCount, customer, rowPerPage, page })
        );
      })
      .catch((err) => {
        dispatch(getAllCustomerFailed(err.response.data?.error));
      });
  };
};
