import React, { useContext } from "react";
import { FaTimes } from "react-icons/fa";

//Context
import CartContext from "../state/CartContext";

//CSS
import "../styles/Product.css";

const CartProduct = ({ product }) => {
  const { productsOnCart, setProductsOnCart } = useContext(CartContext);

  const RemoveFromCart = () => {
    let updatedCart = productsOnCart.filter((cartItem) => cartItem.id !== product.id);
    setProductsOnCart(updatedCart);
  };

  return (
    <div className="Product">
      <div className="Container-product">
        <img src={product.url} alt={product.id} className="Product-image" />
        <span className="Product-info">
          <div className="Product-name">{product.name}</div>
          <div className="Product-price">Price $ {product.price}</div>
          <div>Quantity: <input name={`Product-${product.id}`} value={product.quantity}/></div>
          <div className="Product-price">
            Subtotal $ {product.price * product.quantity}
          </div>
          <div className="Add-to-cart" onClick={RemoveFromCart}>
            <FaTimes /> Remove from cart
          </div>
        </span>
      </div>
    </div>
  );
};

export default CartProduct;
