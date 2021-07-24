import { METAL_STATE, PRODUCT_STATE, REPORT_STATE } from "./action.type";

export const metalState = () => ({
  type: METAL_STATE,
});
export const productState = () => ({
  type: PRODUCT_STATE,
});
export const reportState = () => ({
  type: REPORT_STATE,
});
