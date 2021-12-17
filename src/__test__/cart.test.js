import React from "react";
import { screen, render, act, fireEvent } from "@testing-library/react";
import { server } from "../mocks/server";
import App from "../App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Cart", () => {
  test("Check empty cart", async () => {
    await act(async () => render(<App />));

    // Get go to cart button
    const cartButton = await screen.findByTitle("On-Cart");

    // redirect to cart
    fireEvent.click(cartButton);

    // Check empty cart label
    const empty = await screen.findByText("Your shopping cart is empty");
    expect(empty).toBeInTheDocument();

    // Get go to Homepage
    const homepageButton = await screen.findByTitle("Homepage");

    // redirect to cart
    fireEvent.click(homepageButton);

    // Add an item
    const product1Add = await screen.findByTitle("Add Product 1");
    fireEvent.click(product1Add);

    // redirect to cart
    fireEvent.click(cartButton);

    // Find Product
    const productName = await screen.findByText("Product 1");
    expect(productName).toBeInTheDocument();

    // Find price
    const productPrice = await screen.findByTitle("Product 1 price");
    expect(productPrice).toBeInTheDocument();

    // Find Quantity
    const quantityProduct = await screen.findByTitle(
      "Change Product 1 Quantity"
    );
    expect(quantityProduct.value).toBe("1");

    // Find Subtotal
    const subtotals = await screen.findAllByTitle("Subtotal");
    expect(subtotals[0].textContent).toBe(Number(1).toFixed(2));

    // Update quantity (Max Stock = 5)
    fireEvent.change(quantityProduct, { target: { value: "5" } });
    const OnCart = await screen.findByTitle("On-Cart");
    expect(OnCart.textContent).toBe("5");

    // Try to change it to a higher value
    fireEvent.change(quantityProduct, { target: { value: "8" } });
    expect(OnCart.textContent).toBe("5");

    // Find Remove from cart button
    const removeButton = await screen.findByTitle("Remove Product 1 from cart");
    fireEvent.click(removeButton);

    // Validate items and number in cart
    expect(OnCart.textContent).toBe("0");

    // Validate Removed item
    const empty2 = await screen.findByText("Your shopping cart is empty");
    expect(empty2).toBeInTheDocument();
  });
});
