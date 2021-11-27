import { useState } from "react";

import "./styles/App.css";
import "./styles/HomeSlider.css";
import "./styles/Product.css";
import "./styles/HomeCategories.css";
import "./styles/BannerComponent.css";
import "./styles/Sidebar.css";
import "./styles/Paging.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useFeaturedBanners } from "./utils/hooks/useFeaturedBanners";

// import Home from "./pages/Home";

//JSON data
import Categories from "./mocks/en-us/product-categories.json";
import Products from "./mocks/en-us/products.json";
import FeaturedProducts from "./mocks/en-us/featured-products.json";
import Banners from "./mocks/en-us/featured-banners.json";

//Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllProducts from "./components/AllProducts";
import Home from "./pages/Home";

// Transform Banners to Array Of Banners
const BannersArray = [];

for (var bannerCounter in Banners.results) {
  var banner = Banners.results[bannerCounter];

  BannersArray.push({
    title: banner.data.title,
    description: banner.data.description[0].text,
    image: banner.data.main_image.url,
  });
}

const CategoriesArray = [];

  for (var categoriesCounter in Categories.results) {
    var category = Categories.results[categoriesCounter];

    CategoriesArray.push({
      name: category.data.name,
      id: category.id,
      url: category.data.main_image.url,
      selected: false
    });
  }

  const FeaturedProductsArray = [];

  for (var featuredProductCounter in FeaturedProducts.results) {
    var featuredProduct = FeaturedProducts.results[featuredProductCounter];

    FeaturedProductsArray.push({
      id: featuredProduct.id,
      name: featuredProduct.data.name,
      url: featuredProduct.data.mainimage.url,
      price: featuredProduct.data.price,
      categoryId: featuredProduct.data.category.id
    });
  }

  const ProductsArray = [];

  for (var productCounter in Products.results) {
    var product = Products.results[productCounter];

    ProductsArray.push({
      id: product.id,
      name: product.data.name,
      url: product.data.mainimage.url,
      price: product.data.price,
      categoryId: product.data.category.id
    });
  }
  
function App() {
  const [showHome, setHomeShow] = useState(true);
  const [showProducts, setProductsShow] = useState(false);
  const { data, isLoading } = useFeaturedBanners();
  console.log(data, isLoading);

  const changeToHomePage = () => {
    setHomeShow(true);
    setProductsShow(false);
  };

  const changeToProductsPage = () => {
    setHomeShow(false);
    setProductsShow(true);
  };

  return (
    <div className="App">
      <Header event={changeToHomePage} />
      <div className="Body">
        {showHome && <Home banners={BannersArray} featuredProducts={FeaturedProductsArray} categories={CategoriesArray} onClickEvent={changeToProductsPage} />}
        {showProducts && <AllProducts products={ProductsArray} categories={CategoriesArray}/>}
      </div>
      <Footer />
    </div>

    // <div className="App">
    //   <BrowserRouter>
    //     <header className="App-header">
    //     </header>
    //     <body>
    //       <Routes>
    //         <Route path="/" element={<Home />}></Route>
    //       </Routes>
    //     </body>
    //   </BrowserRouter>
    // </div>
  );
}

export default App;
