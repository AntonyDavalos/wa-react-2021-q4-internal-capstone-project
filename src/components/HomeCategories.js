import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

// CSS
import "../styles/HomeCategories.css";

// Hooks
import useCategoriesFromApi from "../utils/hooks/useCategoriesFromApi";

const HomeCategories = function HomeCategories() {
  const { categories, categoriesAreLoading } = useCategoriesFromApi();
  const [previousCategory, setPreviousCategory] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(1);
  const [nextCategory, setNextCategory] = useState(2);

  const next = () => {
    setPreviousCategory(
      previousCategory === categories.length - 1 ? 0 : previousCategory + 1
    );
    setCurrentCategory(
      currentCategory === categories.length - 1 ? 0 : currentCategory + 1
    );
    setNextCategory(
      nextCategory === categories.length - 1 ? 0 : nextCategory + 1
    );
  };

  const previous = () => {
    setPreviousCategory(
      previousCategory === 0 ? categories.length - 1 : previousCategory - 1
    );
    setCurrentCategory(
      currentCategory === 0 ? categories.length - 1 : currentCategory - 1
    );
    setNextCategory(
      nextCategory === 0 ? categories.length - 1 : nextCategory - 1
    );
  };

  return (
    <div>
      {!categoriesAreLoading && (
        <section className="Categories-list">
          <div className="Categories-title">Categories</div>
          <div>
            <FaArrowAltCircleLeft
              className="Left-arrow"
              onClick={previous}
              size={20}
            />
            <a
              href={`/products?category={${categories[previousCategory].slug}}`}
              className="Category"
            >
              <img
                src={categories[previousCategory].url}
                alt={`category ${previousCategory + 1}`}
                className="Category-image"
                title={categories[previousCategory].name}
              />
            </a>
            <a
              href={`/products?category={${categories[currentCategory].slug}}`}
              className="Category"
            >
              <img
                src={categories[currentCategory].url}
                alt={`category ${currentCategory + 1}`}
                className="Category-image"
                title={categories[currentCategory].name}
              />
            </a>
            <a
              href={`/products?category={${categories[nextCategory].slug}}`}
              className="Category"
            >
              <img
                src={categories[nextCategory].url}
                alt={`category ${nextCategory + 1}`}
                className="Category-image"
                title={categories[nextCategory].name}
              />
            </a>
            <FaArrowAltCircleRight
              className="Right-arrow"
              onClick={next}
              size={20}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default HomeCategories;
