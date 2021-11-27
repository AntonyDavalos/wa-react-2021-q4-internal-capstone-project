import React from "react";

const Sidebar = ({ categories, onClickEvent }) => {
  return (
    <div className="Sidebar">
      {categories.map((category, index) => {
        return (
          <div className={`${category.selected ? "Selected-sidebar-element" : "Sidebar-element"}`} onClick={() => onClickEvent(category.id)} key={category.id}>
            {category.name}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
