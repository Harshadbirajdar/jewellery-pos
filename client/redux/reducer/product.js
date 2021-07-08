import {
  GET_ALL_PRODUCT_FAILED,
  GET_ALL_PRODUCT_START,
  GET_ALL_PRODUCT_SUCCESS,
} from "../action/action.type";

const initalState = {
  viewProduct: {
    loading: false,
    error: false,
    rowPerPage: 10,
    page: 0,
    totalCount: 0,
    product: [],
  },
};

const product = (state = initalState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT_START:
      return {
        ...state,
        viewProduct: { ...state.viewProduct, loading: true, error: false },
      };

    case GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        viewProduct: {
          loading: false,
          error: false,
          rowPerPage: action.payload.rowPerPage,
          page: action.payload.page,
          totalCount: action.payload.totalCount,
          product: action.payload.product,
        },
      };

    case GET_ALL_PRODUCT_FAILED:
      return {
        ...state,
        viewProduct: {
          ...state.viewProduct,
          loading: false,
          error: action.payload,
          product: [],
        },
      };
    default:
      return state;
  }
};

export default product;
