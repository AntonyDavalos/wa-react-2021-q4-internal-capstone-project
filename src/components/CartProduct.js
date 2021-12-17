import React, { useContext } from "react";
import { FaTimes } from "react-icons/fa";

// Context
import CartContext from "../state/CartContext";

// CSS
import "../styles/Product.css";

const CartProduct = function CartProduct({ product }) {
  const { productsOnCart, setProductsOnCart } = useContext(CartContext);

  const RemoveFromCart = () => {
    const updatedCart = productsOnCart.filter(
      (cartItem) => cartItem.id !== product.id
    );
    setProductsOnCart(updatedCart);
  };

  const UpdateItem = (event) => {
    const updatedCart = productsOnCart.map((item) => {
      const newItem = {
        ...item,
        quantity:
          product.id === item.id && Number(event.target.value) <= product.stock
            ? Number(event.target.value)
            : item.quantity,
      };

      return newItem;
    });

    if (event.target.value * 1 === 0) {
      RemoveFromCart();
      alert("Removed from cart.");
      return;
    }

    if (product.stock < Number(event.target.value)) {
      alert(`Cant update product max in stock:  ${product.stock}`);
    } else {
      setProductsOnCart(updatedCart);
    }
  };

  return (
    <div className="Product">
      <div className="Container-product">
        <img src={product.url} alt={product.id} className="Product-image" />
        <span className="Product-info">
          <div className="Product-name">{product.name}</div>
          <div className="Product-price">
            Price ${" "}
            <span title={`${product.name} price`}>
              {product.price.toFixed(2)}
            </span>
          </div>
          <div>
            Quantity:
            <input
              name={`Product-${product.id}`}
              value={product.quantity}
              onChange={UpdateItem}
              type="number"
              title={`Change ${product.name} Quantity`}
            />
          </div>
          <div className="Product-price">
            Subtotal ${" "}
            <span title="Subtotal">
              {(product.price * product.quantity).toFixed(2)}
            </span>
          </div>
          <div
            role="button"
            className="Add-to-cart"
            onClick={RemoveFromCart}
            tabIndex={0}
            aria-hidden="true"
            title={`Remove ${product.name} from cart`}
          >
            <FaTimes /> Remove from cart
          </div>
        </span>
      </div>
    </div>
  );
};

export default CartProduct;
