import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

const backend = "https://fitai.click";

test("renders without crashing", () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});

export { backend };
