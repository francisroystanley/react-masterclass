import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";

import { Product } from "../models/Product";
import { updateProduct, loadProduct } from "../redux/actions/productActions";
import { StoreState } from "../redux/StoreState";

const ManageProduct: React.FC = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const product = useSelector<StoreState>(state => state.product) as Product;
  const [productCopy, setProductCopy] = useState<Product>();

  const changeMode = () => {
    setIsEdit(prevState => !prevState);
  };

  const displayField = (field: string) => {
    if (!isEdit) return product[field];

    return <input name={field} type="text" value={productCopy![field]} required onChange={e => fieldChangeHandler({ [e.target.name]: e.target.value })} />;
  };

  const fieldChangeHandler = (change: { [key: string]: string | number }) => {
    setProductCopy(prevState => ({ ...prevState!, ...change! }));
  };

  const updateProductHandler = () => {
    dispatch(updateProduct(productCopy!));
    changeMode();
    dispatch(loadProduct(productId!));
  };

  const renderButton = () => {
    if (!isEdit) {
      return (
        <Button variant="contained" color="primary" onClick={changeMode}>
          Edit
        </Button>
      );
    }

    return (
      <Button variant="contained" color="secondary" onClick={updateProductHandler}>
        Update
      </Button>
    );
  };

  useEffect(() => {
    dispatch(loadProduct(productId!));
  }, []);

  useEffect(() => {
    setProductCopy(product);
  }, [product]);

  if (!product) return null;

  return (
    <div>
      <p>Manage Product</p>
      <p>Title: {displayField("title")}</p>
      <p>Price: {displayField("price")}</p>
      <p>Rating: {displayField("rating")}</p>
      <p>Stock: {displayField("stockCount")}</p>
      {renderButton()}
    </div>
  );
};

export default ManageProduct;
