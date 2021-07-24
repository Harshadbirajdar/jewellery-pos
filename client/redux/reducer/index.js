import { combineReducers } from "redux";
import metal from "./metal";
import menu from "./menu";
import addProduct from "./addProduct";
import product from "./product";
import sale from "./sale";
import report from "./report";
const rootReducer = combineReducers({
  metal,
  menu,
  addProduct,
  product,
  sale,
  report,
});

export default rootReducer;
