import {
  CREATE_PRODUCT_NAME_FAILED,
  CREATE_PRODUCT_NAME_START,
  CREATE_PRODUCT_NAME_SUCCESS,
  DELETE_PRODUCT_NAME_FAILED,
  DELETE_PRODUCT_NAME_START,
  DELETE_PRODUCT_NAME_SUCCESS,
  GET_PRODUCT_NAME_LIST_FAILED,
  GET_PRODUCT_NAME_LIST_START,
  GET_PRODUCT_NAME_LIST_SUCCESS,
} from "../action/action.type";

const initalState = {
  item: {
    loading: false,
    error: false,
    item: {},
    success: false,
  },
  list: {
    loading: false,
    error: false,
    item: [],
    rowPerPage: 10,
    page: 0,
    totalCount: 0,
  },
  delete: {
    loading: false,
    error: false,
    success: false,
    data: {},
  },
};

const productName = (state = initalState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_NAME_START:
      return {
        ...state,
        item: {
          loading: true,
          error: false,
          success: false,
          item: {},
        },
      };

    case CREATE_PRODUCT_NAME_SUCCESS:
      return {
        ...state,
        item: {
          loading: false,
          error: false,
          success: true,
          item: action.payload,
        },
      };
    case CREATE_PRODUCT_NAME_FAILED:
      return {
        ...state,
        item: {
          loading: false,
          error: action.payload,
          success: false,
          item: {},
        },
      };

    case GET_PRODUCT_NAME_LIST_START:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          error: false,
          item: [],
        },
      };

    case GET_PRODUCT_NAME_LIST_SUCCESS:
      return {
        ...state,
        list: {
          loading: false,
          error: false,
          item: action.payload.productName,
          rowPerPage: action.payload.rowPerPage,
          page: action.payload.page,
          totalCount: action.payload.totalCount,
        },
      };

    case GET_PRODUCT_NAME_LIST_FAILED:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          error: action.payload,
        },
      };

    case DELETE_PRODUCT_NAME_START:
      return {
        ...state,
        delete: {
          loading: true,
          error: false,
          success: false,
          data: {},
        },
      };

    case DELETE_PRODUCT_NAME_SUCCESS:
      return {
        ...state,
        delete: {
          loading: false,
          error: false,
          success: true,
          data: action.payload,
        },
      };

    case DELETE_PRODUCT_NAME_FAILED:
      return {
        ...state,
        delete: {
          loading: false,
          error: action.payload,
          success: false,
          data: {},
        },
      };
    default:
      return state;
  }
};

export default productName;
