import React, { useState } from "react";

import "./styles/App.css";

// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartContext from "./state/CartContext";

// Pages
// "/Home" and "/"
import AllProducts from "./pages/AllProducts";
// "/all-products"
import Home from "./pages/Home";
// "/product"
import Product from "./pages/ProductPage";
// "/search?q={searchTerm}"
import Search from "./pages/Search";
// "/cart"
import Cart from "./pages/CartPage";
// "/checkout"
import Checkout from "./pages/CheckoutPage";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Hook
import useCategoriesFromApi from "./utils/hooks/useCategoriesFromApi";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs]);

const App = function App() {
  const { categories, categoriesAreLoading } = useCategoriesFromApi();
  const [productsOnCart, setProductsOnCart] = useState([]);
  const cartContextProvider = React.useMemo(
    () => ({ productsOnCart, setProductsOnCart }),
    [productsOnCart]
  );

  React.useEffect(() => {
    const data = localStorage.getItem("my-cart");
    if (data) {
      setProductsOnCart(JSON.parse(data));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("my-cart", JSON.stringify(productsOnCart));
  });

  if (categoriesAreLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <CartContext.Provider value={cartContextProvider}>
          <Header />
          <div className="Body">
            <Routes>
              {["/home", "/"].map((path) => (
                <Route
                  key={path}
                  path={path}
                  element={<Home categories={categories} />}
                />
              ))}
              {[
                "/products",
                "/products?category={categorySlug}",
                "/products?page=",
              ].map((path) => (
                <Route
                  key={path}
                  path={path}
                  element={<AllProducts categories={categories} />}
                />
              ))}
              <Route
                path="/product/:id"
                element={<Product categories={categories} />}
              />
              <Route
                path="/search"
                element={<Search categories={categories} />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </div>
          <Footer />
        </CartContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
