import React from "react";

// CSS
import "../styles/Sidebar.css";

const Sidebar = function Sidebar({ categories, query }) {
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
        let selected = false;
        let queryFilters = [];

        if (!originalFilters.includes(category.slug)) {
          queryFilters = originalFilters.map(
            (categoryFilter) => categoryFilter
          );
          queryFilters.push(category.slug);
        } else {
          selected = true;
          queryFilters = originalFilters.filter(
            (filter) => filter !== category.slug
          );
        }
        return (
          <a
            href={`${
              queryFilters.length === 0
                ? "/products"
                : `/products?category={${queryFilters.join(",")}}`
            }`}
            key={category.id}
          >
            <div
              className={`${
                selected ? "Selected-sidebar-element" : "Sidebar-element"
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
