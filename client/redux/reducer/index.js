import { combineReducers } from "redux";
import metal from "./metal";
import menu from "./menu";
import addProduct from "./addProduct";
import product from "./product";
import sale from "./sale";
const rootReducer = combineReducers({
  metal,
  menu,
  addProduct,
  product,
  sale,
});

export default rootReducer;
