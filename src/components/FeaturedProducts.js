import React from "react";
import ProductGrid from "./ProductGrid";

// Hook
import useFeaturedProductsFromApi from "../utils/hooks/useFeaturedProductsFromApi";

const FeaturedProducts = function FeaturedProducts({ categories }) {
  const { featuredProducts, featuredProductsAreLoading } =
    useFeaturedProductsFromApi();
  return (
    <div className="Featured">
      {!featuredProductsAreLoading && (
        <ProductGrid products={featuredProducts} categories={categories} />
      )}
    </div>
  );
};

export default FeaturedProducts;
