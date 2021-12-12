import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProductGrid from "../components/ProductGrid";
import { useLocation } from "react-router-dom";
//Hooks
import { useFilteredProductsFromApi } from "../utils/hooks/useFilteredProductsFromApi";
import { useCategoriesFromApi } from "../utils/hooks/useCategoriesFromApi";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const AllProducts = () => {
  let query = useQuery();
  
  const { categories, categoriesAreLoading } = useCategoriesFromApi();
  const { filteredProductsData, filteredProductsAreLoading } =
    useFilteredProductsFromApi(query.get("category"), query.get("page"));
  const [sidebarCategories, setItems] = useState(categories);
  const [products, setProducts] = useState(filteredProductsData.results);

  useEffect(() => {
    setItems(categories);
  }, [categories]);

  useEffect(() => {
    setProducts(filteredProductsData.results);
    }, [filteredProductsData]);

  if (categoriesAreLoading || filteredProductsAreLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Sidebar categories={sidebarCategories} query={query.get("category")} />
      {products && !filteredProductsData && 
      <ProductGrid products={products} categories={sidebarCategories}/>}
      {products && filteredProductsData && 
      <ProductGrid products={products} categories={sidebarCategories} showPagination={true} page={filteredProductsData.page} pages={filteredProductsData.total_pages}/>}
    </div>
  );
};

export default AllProducts;
