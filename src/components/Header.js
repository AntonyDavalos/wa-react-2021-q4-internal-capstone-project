import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../Logo.png";

const Header = ({event}) => {
  return (
      
    <div className="App-header">
        <div>
          <span className="Title" onClick={event}>
            <img className="Logo" src={logo} alt="Logo" width="25px" />
            Muebleria Xtrema
          </span>
          <span className="Shopping-options">
            <FaShoppingCart className="Shopping-cart"/>
            <input placeholder="Search" className="Search-input"></input>
          </span>
        </div>
      </div>
  );
};

export default Header;