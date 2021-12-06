import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";

//Context
import CartContext from "../state/CartContext";

//CSS
import "../styles/Product.css";

const Product = ({ product, category }) => {
  const { productsOnCart, setProductsOnCart } = useContext(CartContext);

  const AddToCart = () => {
    let updatedCart = productsOnCart.map((item) => {
      const newItem = {
        ...item,
        quantity: product.id === item.id ? item.quantity + 1 : item.quantity,
      };

      return newItem;
    });

    if (updatedCart.length === 0 || updatedCart.filter((cartItem) => cartItem.id === product.id).length === 0) {
      updatedCart.push({
        id: product.id,
        name: product.name,
        url: product.url,
        price: product.price,
        quantity: 1,
      });
    }

    setProductsOnCart(updatedCart);
  };

  return (
    <div className="Product">
      <div className="Container-product">
        <img src={product.url} alt={product.id} className="Product-image" />
        <span className="Product-info">
          <a href={`/product/${product.id}`} className="Normilize-link-color">
            <div className="Product-category">{category}</div>
            <div className="Product-name">{product.name}</div>
            <div className="Product-price">Price $ {product.price}</div>
          </a>
          <div className="Add-to-cart" onClick={AddToCart}>
            <FaShoppingCart /> Add to cart
          </div>
        </span>
      </div>
    </div>
  );
};

export default Product;
