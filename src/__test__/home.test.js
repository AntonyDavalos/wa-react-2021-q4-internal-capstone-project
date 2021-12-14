import React from "react";
import { screen, render } from "@testing-library/react";
import { server } from "../mocks/server";
import App from "../App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Homepage tests", () => {
  it("Get Homepage", () => {
    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
