import React from "react";
import { screen, render, act, fireEvent } from "@testing-library/react";
import { server } from "../mocks/server";
import App from "../App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Get Search", () => {
  test("Search bullets", async () => {
    await act(async () => render(<App />));

    // Get Search Input
    const searchInput = await screen.findByTitle("Search");

    // Add value that will return nothing
    fireEvent.change(searchInput, { target: { value: "nothing" } });

    // Get Search Button
    const searchButton = await screen.findByTitle("Search now");

    // Trigger redirect
    fireEvent.click(searchButton);

    // Get Not Found
    const notFound = await screen.findByText("No products were found");
    expect(notFound).toBeInTheDocument();

    // Change values and redirect
    fireEvent.change(searchInput, { target: { value: "something" } });
    fireEvent.click(searchButton);

    // Get Elements from search
    const product = await screen.findByText("Product 1");
    expect(product).toBeInTheDocument();
  });
});
