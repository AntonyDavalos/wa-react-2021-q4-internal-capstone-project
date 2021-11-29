import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Sidebar from "../components/Sidebar";
import Paging from "../components/Paging";
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
  const [products, setProducts] = useState(filteredProductsData);

  useEffect(() => {
    setItems(categories);
  }, [categories]);

  useEffect(() => {
    setProducts(filteredProductsData);
  }, [filteredProductsData]);

  if (categoriesAreLoading || filteredProductsAreLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Sidebar categories={sidebarCategories} query={query.get("category")} />
      {products.map((product) => {
        const category = sidebarCategories.find(
          (category) => category.id === product.categoryId
        ).name;
        return (
          <div key={product.id}>
            <Product product={product} category={category} />
          </div>
        );
      })}
      <Paging />
    </div>
  );
};

export default AllProducts;
