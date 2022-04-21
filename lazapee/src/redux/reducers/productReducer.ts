import { Reducer } from "redux";
import { Product } from "../../models/Product";

import ProductAction from "../actions/actionTypes";
import { StoreState, initialState } from "./../StoreState";

const productReducer: Reducer<StoreState, ProductAction> = (state: StoreState = initialState, action: ProductAction) => {
  const productList: Product[] = JSON.parse(JSON.stringify(state.productList));
  let productIndex: number;

  switch (action.type) {
    case "PRODUCT LOAD":
      return { ...state, product: state.productList.find(item => item._id === action.payload) };
    case "PRODUCTLIST LOAD SUCCESS":
      return { ...state, productList: action.payload };
    case "BUY PRODUCT":
      productIndex = productList.findIndex(item => item._id === action.payload)!;
      productList[productIndex].soldCount++;

      return { ...state, productList };
    case "UPDATE PRODUCT":
      productIndex = productList.findIndex(item => item._id === action.payload._id)!;
      productList[productIndex] = action.payload;

      return { ...state, productList };
    default:
      return state;
  }
};

export default productReducer;
