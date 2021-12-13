import React from "react";
import ProductGrid from "./ProductGrid";

const FeaturedProducts = function FeaturedProducts({ products, categories }) {
  return (
    <div className="Featured">
      {products && <ProductGrid products={products} categories={categories} />}
    </div>
  );
};

export default FeaturedProducts;
