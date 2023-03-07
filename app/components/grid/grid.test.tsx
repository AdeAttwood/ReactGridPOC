import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import Grid from "./grid";

afterEach(cleanup);

test("renders", () => {
  const { getByText } = render(<Grid />);
  expect(getByText("Grid"));
});
