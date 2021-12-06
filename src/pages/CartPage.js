import React, { useContext } from "react";

//Cart Product component
import CartProduct from "../components/CartProduct";

//Context
import CartContext from "../state/CartContext";

const CartPage = () => {
  const { productsOnCart, setProductsOnCart } = useContext(CartContext);

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
      <h3>Amount to pay  ${productsOnCart && productsOnCart.length > 0 ? productsOnCart.reduce((n, {quantity, price}) => n + (quantity * price), 0): "0"}</h3>
    </div>
  );
};

export default CartPage;
