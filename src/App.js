import React from "react";

import "./styles/App.css";
import "./styles/HomeSlider.css";
import "./styles/Product.css";
import "./styles/HomeCategories.css";
import "./styles/BannerComponent.css";
import "./styles/Sidebar.css";
import "./styles/Paging.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";

//Pages
// "/Home" and "/"
import AllProducts from "./pages/AllProducts";
// "/all-products"
import Home from "./pages/Home";

//Components
import Header from "./components/Header";
import Footer from "./components/Footer";

//Hooks
import { useFeaturedBanners } from "./utils/hooks/useFeaturedBanners";
import { useCategoriesFromApi } from "./utils/hooks/useCategoriesFromApi";
import { useFeaturedProductsFromApi } from "./utils/hooks/useFeaturedProductsFromApi";

function App() {
  const { banners, bannersAreLoading } = useFeaturedBanners();
  const { categories, categoriesAreLoading } = useCategoriesFromApi();
  const { featuredProducts, featuredProductsAreLoading } = useFeaturedProductsFromApi();
  if (bannersAreLoading || categoriesAreLoading || featuredProductsAreLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <div className="Body">
          <Routes>
            {["/home", "/"].map((path, index) => (
              <Route
                key={path + index}
                path={path}
                element={
                  <Home
                    banners={banners}
                    featuredProducts={featuredProducts}
                    categories={categories}
                  />
                }
              ></Route>
            ))}
            {["/products", "/products?category={categorySlug}", "/products?page="].map((path, index) => (
              <Route
                key={path + index}
                path={path}
                element={
                  <AllProducts/>
                }
              ></Route>
            ))}
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
