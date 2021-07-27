import {
  GET_ALL_CUSTOMER_FAILED,
  GET_ALL_CUSTOMER_START,
  GET_ALL_CUSTOMER_SUCCESS,
} from "../action/action.type";

const iniatalState = {
  viewCustomer: {
    loading: false,
    customer: [],
    rowPerPage: 10,
    page: 0,
    totalCount: 0,
    error: false,
  },
};

const customer = (state = iniatalState, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMER_START:
      return {
        ...state,
        viewCustomer: {
          ...state.viewCustomer,
          loading: true,
          customer: [],
          error: false,
        },
      };
    case GET_ALL_CUSTOMER_SUCCESS:
      return {
        ...state,
        viewCustomer: {
          loading: false,
          customer: action.payload.customer,
          rowPerPage: action.payload.rowPerPage,
          page: action.payload.page,
          totalCount: action.payload.totalCount,
          error: false,
        },
      };
    case GET_ALL_CUSTOMER_FAILED:
      return {
        ...state,
        viewCustomer: {
          viewCustomer: {
            ...state.viewCustomer,
            loading: false,
            error: action.payload,
          },
        },
      };

    default:
      return state;
  }
};

export default customer;
