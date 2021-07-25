import {
  GET_ALL_METAL_LIST_FOR_RATE_FAILED,
  GET_ALL_METAL_LIST_FOR_RATE_START,
  GET_ALL_METAL_LIST_FOR_RATE_SUCCESS,
} from "../action/action.type";

const initalState = {
  metal: {
    loading: false,
    error: false,
    metal: [],
  },
};

const rate = (state = initalState, action) => {
  switch (action.type) {
    case GET_ALL_METAL_LIST_FOR_RATE_FAILED:
      return {
        ...state,
        metal: {
          loading: false,
          error: action.payload,
          metal: [],
        },
      };

    case GET_ALL_METAL_LIST_FOR_RATE_SUCCESS:
      return {
        ...state,
        metal: {
          loading: false,
          error: false,
          metal: action.payload,
        },
      };

    case GET_ALL_METAL_LIST_FOR_RATE_START:
      return {
        ...state,
        metal: {
          loading: true,
          error: false,
          metal: [],
        },
      };

    default:
      return state;
  }
};

export default rate;
