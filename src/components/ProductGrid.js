import React from "react";
import { useLocation } from "react-router-dom";

import Product from "./Product";
import Paging from "./Paging";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ProductGrid = function ProductGrid({
  products,
  categories,
  showPagination,
  page,
  pages,
}) {
  const query = useQuery();
  // console.log(showPagination);
  // console.log(page);
  // console.log(pages);
  // console.log(query);
  return (
    <div>
      {products.map((product) => {
        const category = categories.find(
          (categoryItem) => categoryItem.id === product.categoryId
        ).name;
        return (
          <div key={product.id}>
            <Product product={product} category={category} />
          </div>
        );
      })}
      {showPagination && <Paging page={page} pages={pages} query={query} />}
    </div>
  );
};

export default ProductGrid;
