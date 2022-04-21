import { Action } from "redux";

import { Product } from "../../models/Product";

export interface ProductLoadAction extends Action {
  type: "PRODUCT LOAD";
  payload: string;
}

export interface ProductListLoadAction extends Action {
  type: "PRODUCTLIST LOAD SUCCESS";
  payload: Product[];
}

export interface BuyProductAction extends Action {
  type: "BUY PRODUCT";
  payload: string;
}

export interface EditProductAction extends Action {
  type: "EDIT PRODUCT";
}

export interface UpdateProductAction extends Action {
  type: "UPDATE PRODUCT";
  payload: Product;
}

type ProductAction = ProductLoadAction | ProductListLoadAction | BuyProductAction | EditProductAction | UpdateProductAction;

export default ProductAction;
