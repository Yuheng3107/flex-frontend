import React from "react";
import { render } from "@testing-library/react";
import { backend } from "./App";
import LikeIcon from "./assets/svgComponents/LikeIcon";
// App doesn't work for now because of lack of Provider component, some redux issue
test("check that backend is localhost for dev", () => {
  expect(backend).toBe("http://localhost:8000");
});
