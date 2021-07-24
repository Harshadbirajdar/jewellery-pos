import {
  GET_BILL_REPORT_FAILED,
  GET_BILL_REPORT_START,
  GET_BILL_REPORT_SUCCESS,
} from "./action.type";
import axiosInstance from "../../helper/axiosInstance";
const getBillReportStart = () => ({
  type: GET_BILL_REPORT_START,
});
const getBillReportSuccess = (report) => ({
  type: GET_BILL_REPORT_SUCCESS,
  payload: report,
});
const getBillReportFailed = (error) => ({
  type: GET_BILL_REPORT_FAILED,
  payload: error,
});

export const getBillReport = (rowPerPage, page, startDate, endDate) => {
  return (dispatch) => {
    dispatch(getBillReportStart());

    axiosInstance
      .get(
        `/bill/report?startDate=${startDate}&endDate=${endDate}&rowPerPage=${rowPerPage}&page=${page}`
      )
      .then((response) => {
        const { totalCount, bill } = response.data;

        dispatch(getBillReportSuccess({ totalCount, bill, rowPerPage, page }));
      })
      .catch((err) => {
        dispatch(getBillReportFailed(err.response?.data?.error));
      });
  };
};
