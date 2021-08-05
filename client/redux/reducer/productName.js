import {
  CREATE_PRODUCT_NAME_FAILED,
  CREATE_PRODUCT_NAME_START,
  CREATE_PRODUCT_NAME_SUCCESS,
} from "../action/action.type";

const initalState = {
  item: {
    loading: false,
    error: false,
    item: {},
    success: false,
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
    default:
      return state;
  }
};

export default productName;
