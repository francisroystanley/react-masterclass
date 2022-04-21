import { Product } from "../models/Product";

export interface StoreState {
  productList: Product[];
  product?: Product;
}

export const initialState: StoreState = {
  productList: []
};
