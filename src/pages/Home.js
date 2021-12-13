import React from "react";
import { NavLink } from "react-router-dom";

// Called Components
import HomeSliderComponent from "../components/HomeSlider";
import HomeCategoriesComponent from "../components/HomeCategories";
import FeaturedProductsComponent from "../components/FeaturedProducts";

const Home = function Home({ banners, featuredProducts, categories }) {
  return (
    <div className="Home">
      <div className="featuredSlider">
        <HomeSliderComponent banners={banners} length={banners.length} />
      </div>
      <div className="Categories">
        <HomeCategoriesComponent
          categories={categories}
          length={categories.length}
        />
      </div>
      <div className="Products">
        <FeaturedProductsComponent
          products={featuredProducts}
          categories={categories}
        />
        <NavLink to="/products">
          <button type="button" className="See-more-button">
            View all products
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
