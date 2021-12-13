import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../Logo.png";

// CSS
import "../styles/Header.css";

// Components
import OnCart from "./OnCartComponent";

const Header = function Header() {
  const [url, changeUrl] = useState("");

  const handleChange = (event) => {
    changeUrl(event.target.value);
  };

  return (
    <div className="App-header">
      <div>
        <NavLink className="Title" to="/">
          <img className="Logo" src={logo} alt="Logo" width="25px" />
          Muebleria Xtrema
        </NavLink>
        <span className="Shopping-options">
          <NavLink to="/cart" className="Normilize-link-color">
            <OnCart />
          </NavLink>
          <a href={`/search?q=${url}`} className="Normilize-link-color">
            <FaSearch className="Shopping-cart" size={20} />
          </a>
          <input
            placeholder="Search"
            className="Search-input"
            onChange={handleChange}
          />
        </span>
      </div>
    </div>
  );
};

export default Header;
