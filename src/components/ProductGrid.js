import React from "react";
import { useLocation } from "react-router-dom";

import Product from "../components/Product";
import Paging from "../components/Paging";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

const ProductGrid = ({products, categories, showPagination, page, pages}) => {
    let query = useQuery();

  return <div>
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
      {showPagination && (
        <Paging
          page={page}
          pages={pages}
          query={query}
        />
      )}
  </div>;
};

export default ProductGrid;
