import React from "react";

const Paging = () => {
  return (
    <div className="Paging">
      <span className="Paging-element">&laquo;</span>
      <span className="Paging-element">&lt;</span>
      <span className="Paging-element-active">1</span>
      <span className="Paging-element">2</span>
      <span className="Paging-element">3</span>
      <span className="Paging-element">&gt;</span>
      <span className="Paging-element">&raquo;</span>
    </div>
  );
};

export default Paging;
