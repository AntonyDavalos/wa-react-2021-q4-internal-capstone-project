import React from "react";

//Called Components
import HomeSliderComponent from "../components/HomeSlider";
import HomeCategoriesComponent from "../components/HomeCategories";
import FeaturedProductsComponent from "../components/FeaturedProducts";
import { NavLink } from "react-router-dom";

const Home = ({ banners, featuredProducts, categories}) => {
  return (
    <div className="Home">
      <div className="featuredSlider">
        <HomeSliderComponent banners={banners} />
      </div>
      <div className="Categories">
        <HomeCategoriesComponent categories={categories} />
      </div>
      <div className="Products">
        <FeaturedProductsComponent
          products={featuredProducts}
          categories={categories}
        />
        <NavLink to="/all-products">
          <button className="See-more-button">
            View all products
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
