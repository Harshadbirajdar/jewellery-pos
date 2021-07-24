import {
  GET_BILL_REPORT_FAILED,
  GET_BILL_REPORT_START,
  GET_BILL_REPORT_SUCCESS,
} from "../action/action.type";

const initalState = {
  viewBill: {
    loading: false,
    error: false,
    rowPerPage: 10,
    page: 0,
    bill: [],
    totalCount: 0,
  },
};

const report = (state = initalState, action) => {
  switch (action.type) {
    case GET_BILL_REPORT_START:
      return {
        ...state,
        viewBill: {
          ...state.viewBill,
          loading: true,
          error: false,
        },
      };

    case GET_BILL_REPORT_SUCCESS:
      return {
        ...state,
        viewBill: {
          loading: false,
          error: false,
          rowPerPage: action.payload.rowPerPage,
          page: action.payload.page,
          totalCount: action.payload.totalCount,
          bill: action.payload.bill,
        },
      };
    case GET_BILL_REPORT_FAILED:
      return {
        ...state,
        viewBill: {
          ...state.viewBill,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default report;
