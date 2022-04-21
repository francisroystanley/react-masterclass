import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import ProductList from "./components/ProductList";
import About from "./components/About";
import Home from "./components/Home";
import ManageProduct from "./components/ManageProduct";
import NotFound from "./components/NotFound";

import "./App.css";

const App = () => {
  return (
    <div>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<ProductList />} />
          <Route path="manageProduct/:productId" element={<ManageProduct />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
