import { combineReducers } from "redux";
import metal from "./metal";
import menu from "./menu";
import addProduct from "./addProduct";
import product from "./product";
import sale from "./sale";
import report from "./report";
import rate from "./rate";
const rootReducer = combineReducers({
  metal,
  menu,
  addProduct,
  product,
  sale,
  report,
  rate,
});

export default rootReducer;
