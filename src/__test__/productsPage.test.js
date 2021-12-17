import React from "react";
import { screen, render, act, fireEvent } from "@testing-library/react";
import { server } from "../mocks/server";
import App from "../App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Cant test next and last button because they anchor tags
describe("All Products tests", () => {
  test("Get Products list", async () => {
    await act(async () => render(<App />));

    // Get All products link button
    const allProductsButton = await screen.findByText("View all products");

    // Change to AllProducts Page
    fireEvent.click(allProductsButton);
    // await waitFor(async () => {});

    // Get a product not in Featured
    const product8 = await screen.findByText("Product 8");
    expect(product8).toBeInTheDocument();

    // Check page 1
    const page1 = await screen.findByAltText("1");
    expect(page1).toBeInTheDocument();

    // Check if Next and Last are available on page 1
    const Next = await screen.findByTitle("Next");
    expect(Next).toBeInTheDocument();

    const Last = await screen.findByTitle("Last");
    expect(Last).toBeInTheDocument();

    // Check if First and Previous are found in page 1
    const buttonPrevious = screen.queryByTitle("Previous");
    expect(buttonPrevious).not.toBeInTheDocument();

    const buttonFirst = screen.queryByTitle("First");
    expect(buttonFirst).not.toBeInTheDocument();
  });
});
