import React from "react";

//CSS
import "../styles/Sidebar.css";

const Sidebar = ({ categories, query }) => {
  let originalFilters = [];
  if (query) {
    originalFilters = query.replace("{", "").replace("}", "").split(",");
  }
  return (
    <div className="Sidebar">
      <a href="/products">
        <div className="Sidebar-element">Clear All</div>
      </a>
      {categories.map((category) => {
        let queryFilters = [];

        if (!originalFilters.includes(category.slug)) {
          category.selected = false;
          queryFilters = originalFilters.map((category) => {
            return category;
          });
          queryFilters.push(category.slug);
        } else {
          category.selected = true;
          queryFilters = originalFilters.filter(
            (filter) => filter !== category.slug
          );
        }
        return (
          <a href={`${
              queryFilters.length === 0
                ? "/products"
                : `/products?category={${queryFilters.join(",")}}`
            }`}
            key={category.id}
          >
            <div
              className={`${
                category.selected
                  ? "Selected-sidebar-element"
                  : "Sidebar-element"
              }`}
            >
              {category.name}
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default Sidebar;
