import React, { useState } from "react";
import Product from "../components/Product";
import Sidebar from "../components/Sidebar";
import Paging from "../components/Paging";

const AllProducts = ({ products, categories }) => {
  const [sidebarCategories, setItems] = useState(categories);
  const [shownProducts, setProducts] = useState(products);

  const updateFilter = (id) => {
    let filter = [];

    let newSidebarCategories = sidebarCategories.map((category) => {
      const newCategory = {
        ...category,
        selected: category.id === id ? !category.selected : category.selected,
      };
      if (newCategory.selected) 
        filter.push(category.id);
      return newCategory;
    });

    setItems(newSidebarCategories);

    if (filter.length === 0) {
      setProducts(products);
    } else {
      let filteredProducts = products.filter((product) => filter.includes(product.categoryId));
      setProducts(filteredProducts);
    }
  };

  return (
    <div>
      <Sidebar categories={sidebarCategories} onClickEvent={updateFilter} />
      {shownProducts.map((product) => {
        const category = sidebarCategories.find(
          (category) => category.id === product.categoryId
        ).name;
        return (
          <div key={product.id}>
            <Product product={product} category={category} />
          </div>
        );
      })}
      <Paging/>
    </div>
  );
};

export default AllProducts;
