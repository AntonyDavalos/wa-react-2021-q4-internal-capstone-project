import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

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
      <h3>Amount to pay  ${productsOnCart && productsOnCart.length > 0 ? productsOnCart.reduce((n, {quantity, price}) => n + (quantity * price), 0).toFixed(2): "0"}</h3>
      <NavLink to="/checkout">Go to checkout</NavLink>
    </div>
  );
};

export default CartPage;
