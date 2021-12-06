import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../Logo.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [url, changeUrl] = useState("");

  const handleChange = (event) => {
    changeUrl(event.target.value);
  }

  return (
    <div className="App-header">
      <div>
        <NavLink className="Title" to="/">
          <img className="Logo" src={logo} alt="Logo" width="25px" />
          Muebleria Xtrema
        </NavLink>
        <span className="Shopping-options">
          <a href={`/search?q=${url}`} className="Normilize-link-color">
            <FaShoppingCart className="Shopping-cart" />
          </a>
          <input placeholder="Search" className="Search-input" onChange={handleChange}></input>
        </span>
      </div>
    </div>
  );
};

export default Header;
