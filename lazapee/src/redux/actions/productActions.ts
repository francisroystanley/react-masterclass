import { Dispatch } from "react";

import { BuyProductAction, EditProductAction, ProductListLoadAction, ProductLoadAction, UpdateProductAction } from "./actionTypes";
import { getAllProducts } from "../../services/lazapeeService";
import { Product } from "../../models/Product";

export const loadProduct = (productId: string): ProductLoadAction => ({
  type: "PRODUCT LOAD",
  payload: productId
});

const loadProductListSuccess = (products: Product[]): ProductListLoadAction => ({
  type: "PRODUCTLIST LOAD SUCCESS",
  payload: products
});

export const buyProduct = (productId: string): BuyProductAction => ({
  type: "BUY PRODUCT",
  payload: productId
});

export const editProduct = (): EditProductAction => ({
  type: "EDIT PRODUCT"
});

export const updateProduct = (product: Product): UpdateProductAction => ({
  type: "UPDATE PRODUCT",
  payload: product
});

export const loadProductList = (dispatch: Dispatch<any>) => {
  getAllProducts().then(products => dispatch(loadProductListSuccess(products)));
};
