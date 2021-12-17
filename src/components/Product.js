import React, { useContext, useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// Context
import CartContext from "../state/CartContext";

// CSS
import "../styles/Product.css";

const Product = function Product({ product, category }) {
  const { productsOnCart, setProductsOnCart } = useContext(CartContext);
  const [available, setAvailable] = useState(false);
  const foundInCart = productsOnCart.find(
    (cartItem) => cartItem.id === product.id
  );

  useEffect(() => {
    if (!foundInCart || foundInCart.quantity < product.stock) {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  }, [foundInCart, product.stock]);

  const AddToCart = () => {
    const updatedCart = productsOnCart.map((item) => {
      const newItem = {
        ...item,
        quantity: product.id === item.id ? item.quantity + 1 : item.quantity,
      };

      return newItem;
    });

    const foundItem = updatedCart.find(
      (cartItem) => cartItem.id === product.id
    );

    if (!foundItem) {
      updatedCart.push({
        id: product.id,
        name: product.name,
        url: product.url,
        price: product.price,
        stock: product.stock,
        quantity: 1,
      });
    }

    if (foundItem && foundItem.quantity > foundItem.stock) {
      alert(`Cant add product max in stock: ${foundItem.stock}`);
    } else {
      setProductsOnCart(updatedCart);
      alert("Added 1 to cart.");
    }
  };

  return (
    <div className="Product">
      <div className="Container-product">
        <img src={product.url} alt={product.id} className="Product-image" />
        <span className="Product-info">
          <NavLink
            to={`/product/${product.id}`}
            className="Normilize-link-color"
          >
            <div className="Product-category">{category}</div>
            <div className="Product-name">{product.name}</div>
            <div className="Product-price">
              Price $ {product.price.toFixed(2)}
            </div>
          </NavLink>
          {available && (
            <div
              role="button"
              className="Add-to-cart"
              onClick={AddToCart}
              tabIndex={0}
              aria-hidden="true"
            >
              <FaShoppingCart /> Add to cart
            </div>
          )}
          {!available && <div className="Not-available">Not available</div>}
        </span>
      </div>
    </div>
  );
};

export default Product;
