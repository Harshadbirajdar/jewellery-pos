import {
  CUSTOMER_STATE,
  METAL_STATE,
  PRODUCT_NAME_STATE,
  PRODUCT_STATE,
  REPORT_STATE,
} from "../action/action.type";

const initalState = {
  metal: false,
  product: false,
  report: false,
  customer: false,
  productName: false,
};

const menu = (state = initalState, action) => {
  switch (action.type) {
    case METAL_STATE:
      return { ...state, metal: !state.metal };

    case PRODUCT_STATE:
      return { ...state, product: !state.product };
    case REPORT_STATE:
      return { ...state, report: !state.report };
    case CUSTOMER_STATE:
      return { ...state, customer: !state.customer };
    case PRODUCT_NAME_STATE:
      return { ...state, productName: !state.productName };
    default:
      return state;
  }
};

export default menu;
