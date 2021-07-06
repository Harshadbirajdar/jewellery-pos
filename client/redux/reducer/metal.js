import {
  ADD_NEW_METAL_FAILED,
  ADD_NEW_METAL_START,
  ADD_NEW_METAL_SUCCESS,
  VIEW_ALL_METAL_FAILED,
  VIEW_ALL_METAL_START,
  VIEW_ALL_METAL_SUCCESS,
} from "../action/action.type";

const initalState = {
  create: {
    loading: false,
    error: false,
    success: false,
    metal: {},
  },
  view: {
    rowPerPage: 10,
    page: 0,
    totalCount: 0,
    metals: [],
    error: false,
    loading: false,
  },
};
const metal = (state = initalState, action) => {
  switch (action.type) {
    case ADD_NEW_METAL_START:
      return {
        ...state,
        create: { loading: true, error: false, success: false, metal: {} },
      };

    case ADD_NEW_METAL_SUCCESS:
      return {
        ...state,
        create: {
          loading: false,
          error: false,
          success: true,
          metal: action.payload,
        },
      };
    case ADD_NEW_METAL_FAILED:
      return {
        ...state,
        create: {
          loading: false,
          error: action.payload,
          success: false,
          metal: {},
        },
      };

    case VIEW_ALL_METAL_START:
      return {
        ...state,
        view: { ...state.view, loading: true, metals: [], error: false },
      };

    case VIEW_ALL_METAL_SUCCESS:
      return {
        ...state,
        view: {
          ...state.view,
          loading: false,
          metals: action.payload.metals,
          error: false,
          totalCount: action.payload.totalCount,
          rowPerPage: action.payload.rowPerPage,
          page: action.payload.page,
        },
      };

    case VIEW_ALL_METAL_FAILED:
      return {
        ...state,
        view: {
          ...state.view,
          loading: false,
          metals: [],
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default metal;
