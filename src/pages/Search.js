import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
// Hooks
import useFilterBySearchTextFromApi from "../utils/hooks/UseFilterBySearchTextFromApi";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const SearchPage = function SearchPage({ categories }) {
  const query = useQuery();
  const { filteredProductsData, filteredProductsAreLoading } =
    useFilterBySearchTextFromApi(query.get("q"), query.get("page"));
  const [products, setProducts] = useState(filteredProductsData.results);
  const [sidebarCategories, setItems] = useState(categories);

  useEffect(() => {
    setItems(categories);
  }, [categories]);

  useEffect(() => {
    setProducts(filteredProductsData.results);
  }, [filteredProductsData]);

  if (filteredProductsAreLoading) {
    return <h1>Loading...</h1>;
  }

  if (!filteredProductsAreLoading && (!products || products.length === 0)) {
    return <h1>No products were found</h1>;
  }

  return (
    <div>
      {products && !filteredProductsData && (
        <ProductGrid products={products} categories={sidebarCategories} />
      )}
      {products && filteredProductsData && (
        <ProductGrid
          products={products}
          categories={sidebarCategories}
          showPagination="true"
          page={filteredProductsData.page}
          pages={filteredProductsData.total_pages}
        />
      )}
    </div>
  );
};

export default SearchPage;
