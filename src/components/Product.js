import React from "react";

const Product = ({ product, category }) => {
  return (
    <div className="Product">
      <div className="Container-product">
        <img
          src={product.url}
          alt={product.id}
          className="Product-image"
        />
        <span className="Product-info">
          <div className="Product-category">
            {
              category
            }
          </div>
          <div className="Product-name">{product.name}</div>
          <div className="Product-price">Price $ {product.price}</div>
        </span>
      </div>
    </div>
  );
};

export default Product;
