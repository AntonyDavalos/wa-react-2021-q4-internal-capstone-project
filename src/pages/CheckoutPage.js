import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
// CSS
import "../styles/CheckoutPage.css";

// Context
import CartContext from "../state/CartContext";

const CheckoutPage = function CheckoutPage() {
  const { productsOnCart } = useContext(CartContext);

  return (
    <div>
      <form className="Checkout-form">
        <div className="Checkout-input">
          <label htmlFor="form-Name">
            Name <input id="form-Name" type="text" />
          </label>
        </div>
        <br />
        <div className="Checkout-input">
          <label htmlFor="form-Email">
            Email <input id="form-Email" type="text" />
          </label>
        </div>
        <br />
        <div className="Checkout-input">
          <label htmlFor="form-Zip">
            Zip code
            <input id="form-Zip" type="text" />
          </label>
        </div>
        <br />
        <div className="Checkout-input">
          <div>Comments</div>
        </div>
        <div className="Checkout-input">
          <textarea type="textarea" />
        </div>
      </form>
      <br />
      <br />
      <table className="Checkout-table">
        <thead>
          <tr>
            <td>Product</td>
            <td>Quantity</td>
            <td>Price</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {productsOnCart.map((product) => (
            <tr key={product.id}>
              <td className="Table-data">{product.name}</td>
              <td>{product.quantity}</td>
              <td className="Table-price">$ {product.price.toFixed(2)}</td>
              <td className="Table-price">
                $ {(product.price * product.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" />
            <td>
              $
              {productsOnCart && productsOnCart.length > 0
                ? productsOnCart
                    .reduce((n, { quantity, price }) => n + quantity * price, 0)
                    .toFixed(2)
                : "0"}
            </td>
          </tr>
        </tfoot>
      </table>
      <br />
      <div>
        <NavLink to="/cart" className="Back-to-cart-button">
          Back to Cart
        </NavLink>
        <span className="Place-order-button">Place Order</span>
      </div>
    </div>
  );
};

export default CheckoutPage;
