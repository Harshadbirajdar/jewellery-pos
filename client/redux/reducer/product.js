import {
  ADD_NEW_METAL_TAG_FAILED,
  ADD_NEW_METAL_TAG_START,
  ADD_NEW_METAL_TAG_SUCCESS,
  GET_ALL_PRODUCT_FAILED,
  GET_ALL_PRODUCT_START,
  GET_ALL_PRODUCT_SUCCESS,
  GET_METAL_FOR_TAG_FAILED,
  GET_METAL_FOR_TAG_START,
  GET_METAL_FOR_TAG_SUCCESS,
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
  metalTag: {
    loading: false,
    error: false,
    success: false,
    tag: [],
  },
  metal: {
    loading: false,
    error: false,
    metal: [],
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
    case GET_METAL_FOR_TAG_START:
      return {
        ...state,
        metal: {
          loading: true,
          error: false,
          metal: [],
        },
      };
    case GET_METAL_FOR_TAG_SUCCESS:
      return {
        ...state,
        metal: {
          loading: false,
          error: false,
          metal: action.payload,
        },
      };
    case GET_METAL_FOR_TAG_FAILED:
      return {
        ...state,
        metal: {
          loading: false,
          error: action.payload,
          metal: [],
        },
      };

    case ADD_NEW_METAL_TAG_START:
      return {
        ...state,
        metalTag: {
          loading: true,
          error: false,
          success: false,
          tag: [],
        },
      };
    case ADD_NEW_METAL_TAG_SUCCESS:
      return {
        ...state,
        metalTag: {
          loading: false,
          error: false,
          success: true,
          tag: action.payload,
        },
      };
    case ADD_NEW_METAL_TAG_FAILED:
      return {
        ...state,
        metalTag: {
          loading: false,
          error: action.payload,
          success: false,
          tag: [],
        },
      };
    default:
      return state;
  }
};

export default product;
