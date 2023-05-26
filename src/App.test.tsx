import React from "react";
import { render } from "@testing-library/react";
import { backend } from "./App";

test("check that backend is localhost for dev", () => {
  expect(backend).toBe("http://localhost:8000");
});
