import React from "react";
import Product from "./Product";
const FeaturedProducts = ({ products, categories }) => {
  return (
    <div className="Featured">
      {products.map((product) => {
        const category = categories.find(
          (category) => category.id === product.categoryId
        ).name;
        return (
          <div key={product.id}>
            <Product product={product} category={category} />
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedProducts;
