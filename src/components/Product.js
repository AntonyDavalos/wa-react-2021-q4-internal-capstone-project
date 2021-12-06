import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const Product = ({ product, category }) => {
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
          <div className="Add-to-cart">
            <FaShoppingCart /> Add to cart
          </div>
        </span>
      </div>
    </div>
  );
};

export default Product;
