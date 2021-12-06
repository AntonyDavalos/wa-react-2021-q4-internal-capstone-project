import React from "react";
import { useLocation } from "react-router-dom";

//CSS
import "../styles/Paging.css";

const getPages = (pages, selected, location) => {
  let content = [];

  if (selected !== 1) {
    content.push(
      <a href={`${location}&page=${selected - 1}`} key={"page before"}>
        <span className="Paging-element">&lt;</span>
      </a>
    );
  }

  if (selected > 1) {
    content.push(
      <span className="Paging-element" key={"dotdotdot before"}>
        ...
      </span>
    );
  }
  content.push(
    <span className="Paging-element-active" key={"page " + selected}>
      {selected}
    </span>
  );

  for (
    let after = selected + 1;
    after <= pages && after <= selected + 2;
    after++
  ) {
    content.push(
      <a href={`${location}&page=${after}`} key={"page " + after}>
        <span className="Paging-element">{after}</span>
      </a>
    );
  }

  if (selected + 2 < pages) {
    content.push(
      <span className="Paging-element" key={"dotdotdot after"}>
        ...
      </span>
    );
  }

  if (selected !== pages) {
    content.push(
      <a href={`${location}&page=${selected + 1}`} key={"page after"}>
        <span className="Paging-element">&gt;</span>
      </a>
    );
  }

  return content;
};

const Paging = ({ page, pages, query }) => {
  const location = useLocation();
  let url = location.pathname;

  if (location.search) {
    url = location.search.replace(`&page=${query.get("page")}`, "");
  } else {
    url = url + "?";
  }

  return (
    <div className="Paging">
      <a href={`${url}&page=1`}>
        <span className="Paging-element" key={"page-First"}>
          &laquo;
        </span>
      </a>
      {getPages(pages, page, url)}
      <a href={`${url}&page=${pages}`}>
        <span className="Paging-element" key={"page-Last"}>
          &raquo;
        </span>
      </a>
    </div>
  );
};

export default Paging;
