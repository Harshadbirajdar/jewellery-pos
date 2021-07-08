import { combineReducers } from "redux";
import metal from "./metal";
import menu from "./menu";
import addProduct from "./addProduct";
import product from "./product";
const rootReducer = combineReducers({
  metal,
  menu,
  addProduct,
  product,
});

export default rootReducer;
