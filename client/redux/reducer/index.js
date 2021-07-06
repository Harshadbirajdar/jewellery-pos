import { combineReducers } from "redux";
import metal from "./metal";
import menu from "./menu";
import addProduct from "./addProduct";
const rootReducer = combineReducers({
  metal,
  menu,
  addProduct,
});

export default rootReducer;
