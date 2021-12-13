import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartContext from "../state/CartContext";

// CSS
import "../styles/OnCartComponent.css";

const OnCartComponent = function OnCartComponent() {
  const { productsOnCart } = useContext(CartContext);

  return (
    <span className="On-cart">
      <FaShoppingCart className="Shopping-cart" size={20} />
      <span>{productsOnCart.reduce((n, { quantity }) => n + quantity, 0)}</span>
    </span>
  );
};

export default OnCartComponent;
