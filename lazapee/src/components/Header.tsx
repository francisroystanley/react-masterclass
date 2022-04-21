import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../assets/images/logo.png";

import "../components/Header.css";

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="app-logo" />
      <div className="navbar">
        <NavLink to="/">HOME</NavLink>
        <NavLink to="products">PRODUCTS</NavLink>
        <NavLink to="about">ABOUT</NavLink>
      </div>
    </div>
  );
};

export default Header;
