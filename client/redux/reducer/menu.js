import { METAL_STATE, PRODUCT_STATE } from "../action/action.type";

const initalState = {
  metal: false,
  product: false,
};

const menu = (state = initalState, action) => {
  switch (action.type) {
    case METAL_STATE:
      return { ...state, metal: !state.metal };

    case PRODUCT_STATE:
      return { ...state, product: !state.product };
    default:
      return state;
  }
};

export default menu;
