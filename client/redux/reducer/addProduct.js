import {
  ADD_PRODUCT_FAILED,
  ADD_PRODUCT_START,
  ADD_PRODUCT_SUCCESS,
  GET_METAL_LIST_FAILED,
  GET_METAL_LIST_START,
  GET_METAL_LIST_SUCCESS,
} from "../action/action.type";

const initalState = {
  metal: {
    loading: false,
    error: false,
    metal: [],
  },
  product: {
    loading: false,
    success: false,
    error: false,
    product: [],
  },
};

const addProduct = (state = initalState, action) => {
  switch (action.type) {
    case GET_METAL_LIST_START:
      return { ...state, metal: { loading: true, error: false, metal: [] } };

    case GET_METAL_LIST_FAILED:
      return {
        ...state,
        metal: { loading: false, error: action.payload, metal: [] },
      };
    case GET_METAL_LIST_SUCCESS:
      return {
        ...state,
        metal: { loading: false, error: false, metal: action.payload },
      };

    case ADD_PRODUCT_START:
      return {
        ...state,
        product: {
          loading: true,
          success: false,
          error: false,
          product: [],
        },
      };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        product: {
          loading: false,
          success: true,
          error: false,
          product: action.payload,
        },
      };

    case ADD_PRODUCT_FAILED:
      return {
        ...state,
        product: {
          loading: false,
          success: false,
          error: action.payload,
          product: [],
        },
      };
    default:
      return state;
  }
};

export default addProduct;
