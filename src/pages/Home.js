import React from "react"

//Called Components
import HomeSliderComponent from "../components/HomeSlider";
import HomeCategoriesComponent from "../components/HomeCategories";
import FeaturedProductsComponent from "../components/FeaturedProducts";

const Home = ({ banners, featuredProducts, categories, onClickEvent }) => {
  return (
    <div className="Home">
      <div className="featuredSlider">
        <HomeSliderComponent banners={banners} />
      </div>
      <div className="Categories">
        <HomeCategoriesComponent categories={categories} />
      </div>
      <div className="Products">
        <FeaturedProductsComponent products={featuredProducts} categories={categories} />
        <button className="See-more-button" onClick={onClickEvent}>
          View all products
        </button>
      </div>
    </div>
  );
};

export default Home;