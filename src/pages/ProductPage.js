import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import { Swiper } from "swiper/react/swiper";
import { SwiperSlide } from "swiper/react/swiper-slide";

import { FaShoppingCart } from "react-icons/fa";
//Hooks
import { useProductFromApi } from "../utils/hooks/useProductFromApi";
import { useCategoriesFromApi } from "../utils/hooks/useCategoriesFromApi";

//Context
import CartContext from "../state/CartContext";

//CSS
import "../styles/ProductPage.css";

const ProductPage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { productData, productIsLoading } = useProductFromApi(
    useLocation().pathname.split("/")[2]
  );
  const [product, setProduct] = useState({});
  const { categories, categoriesAreLoading } = useCategoriesFromApi();
  const [categoriesList, setItems] = useState(categories);
  const [productCategory, setCategory] = useState({});
  const { productsOnCart, setProductsOnCart } = useContext(CartContext);

  useEffect(() => {
    if (productData.results) {
      setProduct(productData.results[0]);
    }
  }, [productData]);

  useEffect(() => {
    setItems(categories);
    setCategory(
      categoriesList.find((category) => category.id === product.categoryId)
    );
  }, [categories, categoriesList, product]);

  const AddToCart = () => {
    let itemQuantity = Number(document.getElementsByName("itemQuantity")[0].value);

    let updatedCart = productsOnCart.map((item) => {
      const newItem = {
        ...item,
        quantity: product.id === item.id ? item.quantity + itemQuantity : item.quantity,
      };

      return newItem;
    });

    var foundItem = updatedCart.find((cartItem) => cartItem.id === product.id);

    if (!foundItem) {
      updatedCart.push({
        id: product.id,
        name: product.name,
        url: product.url,
        price: product.price,
        stock: product.stock,
        quantity: itemQuantity
      });
    }

    if(foundItem && foundItem.quantity > foundItem.stock){
      alert("Cant add product max in stock: "+foundItem.stock);
    }else{
      setProductsOnCart(updatedCart);
      alert("Added "+itemQuantity+" to the cart");
    }
  };

  if (productIsLoading || categoriesAreLoading) {
    return <h1>Loading...</h1>;
  }

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  return (
    <div>
      {product && product.gallery && <div>
        <h1>{product.name}</h1>
      <div className="Product-shown">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          className="mySwiper2"
        >
          {product.gallery.map((item) => {
            return (
              <SwiperSlide key={`Main-${item.image.url}`}>
                <img src={item.image.url} alt={item.image.alt} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          className="mySwiper"
        >
          {product.gallery.map((item) => {
            return (
              <SwiperSlide key={`Sidebar-${item.image.url}`}>
                <img src={item.image.url} alt={item.image.alt} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="Detail-card">
        <div>Price: ${product.price}</div>
        <div>SKU: {product.sku}</div>
        <div>Category: {productCategory && `${productCategory.name}`}</div>
        <div>Tags: {product.tags.join(", ")}</div>
        <div className="Flavour-text">{product.flavourText}</div>
        <div>Specs</div>
        <div className="Spec-container">
          {product.specs.map((spec) => {
            return (
              <div className="Product-spec" key={spec.spec_name}>
                <span>- {spec.spec_value}</span>
              </div>
            );
          })}
        </div>
        <div className="Buy-options">
          <h3>Comprar</h3>
          <span className="Add-to-cart Product-view" onClick={AddToCart}>
            <FaShoppingCart />
          </span>
          <span>Cantidad:</span>
          <select className="Select-input" name="itemQuantity">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
          </select>
        </div>
      </div>
          </div>}
      
    </div>
  );
};

export default ProductPage;
