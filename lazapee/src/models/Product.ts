import { v4 } from "uuid";

interface IProduct {
  title: string;
  price: number;
  stockCount: number;
  rating: number;
}

export class Product {
  _id: string;
  title: string;
  price: number;
  rating: number;
  soldCount: number;
  stockCount: number;
  [key: string]: string | number;

  constructor(product: IProduct) {
    this._id = v4();
    this.title = product.title;
    this.price = product.price;
    this.rating = product.rating;
    this.stockCount = product.stockCount;
    this.soldCount = 0;
  }
}
