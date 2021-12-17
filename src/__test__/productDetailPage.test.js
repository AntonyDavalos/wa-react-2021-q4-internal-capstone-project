import React from "react";
import { screen, render, act, fireEvent } from "@testing-library/react";
import { server } from "../mocks/server";
import App from "../App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Get product data", () => {
  test("Get Product", async () => {
    await act(async () => render(<App />));

    // Get product link button
    const product1Button = await screen.findByText("Product 1");

    // Change to product Page to redirect to Product Page
    fireEvent.click(product1Button);

    // Find product labels
    const product = await screen.findByText("Product 1");
    expect(product).toBeInTheDocument();
    const priceLabel = await screen.findByText("Price: $");
    expect(priceLabel).toBeInTheDocument();
    const skuLabel = await screen.findByText("SKU:");
    expect(skuLabel).toBeInTheDocument();
    const categoryLabel = await screen.findByText("Category:");
    expect(categoryLabel).toBeInTheDocument();
    const tagsLabel = await screen.findByText("Tags:");
    expect(tagsLabel).toBeInTheDocument();
    const descriptionLabel = await screen.findByText("Description");
    expect(descriptionLabel).toBeInTheDocument();

    // Find Buy button and quantity selector
    const buyButton = await screen.findByTitle("Buy");
    expect(buyButton).toBeInTheDocument();
    const quantitySelector = await screen.findByTitle("Quantity");
    expect(quantitySelector).toBeInTheDocument();

    // Trigger Buy 1
    fireEvent.click(buyButton);
    const OnCart = await screen.findByTitle("On-Cart");
    expect(OnCart.textContent).toBe("1");

    // Check Not Available
    const NotAvailable = await screen.findByText("Not available");
    expect(NotAvailable).toBeInTheDocument();
  });
});
