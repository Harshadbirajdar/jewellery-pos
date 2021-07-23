import {
  ADD_NEW_CUSTOMER_FAILED,
  ADD_NEW_CUSTOMER_START,
  ADD_NEW_CUSTOMER_SUCCESS,
  GENRATE_BILL_FAILED,
  GENRATE_BILL_START,
  GENRATE_BILL_SUCCESS,
  GET_CUSTOMER_BY_NUMBER_FOR_SALE_FAILED,
  GET_CUSTOMER_BY_NUMBER_FOR_SALE_START,
  GET_CUSTOMER_BY_NUMBER_FOR_SALE_SUCCESS,
  GET_PRODUCT_BY_TAG_FAILED,
  GET_PRODUCT_BY_TAG_START,
  GET_PRODUCT_BY_TAG_SUCCESS,
} from "../action/action.type";

const initalState = {
  tag: {
    loading: false,
    error: false,
    product: {},
  },
  customer: {
    loading: false,
    error: false,
    customer: {},
  },
  bill: {
    loading: false,
    error: false,
    bill: {},
  },
};

const sale = (state = initalState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_BY_NUMBER_FOR_SALE_START:
      return {
        ...state,
        customer: { loading: true, error: false, customer: {} },
      };

    case GET_CUSTOMER_BY_NUMBER_FOR_SALE_SUCCESS:
      return {
        ...state,
        customer: { loading: false, error: false, customer: action.payload },
      };

    case GET_CUSTOMER_BY_NUMBER_FOR_SALE_FAILED:
      return {
        ...state,
        customer: { loading: false, error: action.payload, customer: {} },
      };
    case ADD_NEW_CUSTOMER_START:
      return {
        ...state,
        customer: { loading: true, error: false, customer: {} },
      };

    case ADD_NEW_CUSTOMER_SUCCESS:
      return {
        ...state,
        customer: { loading: false, error: false, customer: action.payload },
      };

    case ADD_NEW_CUSTOMER_FAILED:
      return {
        ...state,
        customer: { loading: false, error: action.payload, customer: {} },
      };

    case GET_PRODUCT_BY_TAG_START:
      return {
        ...state,
        tag: {
          loading: true,
          error: false,
          product: {},
        },
      };
    case GET_PRODUCT_BY_TAG_SUCCESS:
      return {
        ...state,
        tag: { loading: false, error: false, product: action.payload },
      };

    case GET_PRODUCT_BY_TAG_FAILED:
      return {
        ...state,
        tag: { loading: false, error: action.payload, product: {} },
      };

    case GENRATE_BILL_START:
      return {
        ...state,
        bill: {
          loading: true,
          error: false,
          bill: {},
        },
      };

    case GENRATE_BILL_SUCCESS:
      return {
        ...state,
        bill: {
          loading: false,
          error: false,
          bill: action.payload,
        },
      };

    case GENRATE_BILL_FAILED:
      return {
        ...state,
        bill: {
          loading: false,
          error: action.payload,
          bill: {},
        },
      };

    default:
      return state;
  }
};

export default sale;
