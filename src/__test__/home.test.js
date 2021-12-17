import React from "react";
import { screen, render, act } from "@testing-library/react";
import { server } from "../mocks/server";
import App from "../App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Homepage tests", () => {
  it("Get Homepage", async () => {
    await act(async () => render(<App />));

    const banner = await screen.findByText("banner 1 title");
    expect(banner).toBeInTheDocument();

    const category1 = await screen.findByAltText("category 1");
    expect(category1).toBeInTheDocument();
    const category2 = await screen.findByAltText("category 2");
    expect(category2).toBeInTheDocument();
    const category3 = await screen.findByAltText("category 3");
    expect(category3).toBeInTheDocument();

    const product1 = await screen.findByText("Product 1");
    expect(product1).toBeInTheDocument();
    const product2 = await screen.findByText("Product 2");
    expect(product2).toBeInTheDocument();
    const product3 = await screen.findByText("Product 3");
    expect(product3).toBeInTheDocument();
  });
});
