import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

//CSS
import "../styles/CartPage.css"
//Cart Product component
import CartProduct from "../components/CartProduct";

//Context
import CartContext from "../state/CartContext";

const CartPage = () => {
  const { productsOnCart } = useContext(CartContext);

    if(productsOnCart.length === 0){
        return(
            <h1>Your shopping cart is empty</h1>
        );
    }

  return (
    <div>
      {productsOnCart && productsOnCart.map((product) => {
          return(
              <div key={product.id}>
                  <CartProduct product={product}/>
              </div>
          );
      })}
      <h2>Amount to pay  ${productsOnCart && productsOnCart.length > 0 ? productsOnCart.reduce((n, {quantity, price}) => n + (quantity * price), 0).toFixed(2): "0"}</h2>
      <NavLink to="/checkout" className="Go-to-checkout-button">Go to checkout</NavLink>
    </div>
  );
};

export default CartPage;
