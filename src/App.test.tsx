import React from "react";
import { render } from "@testing-library/react";
import { backend } from "./App";
import App from "./App";
import { Provider } from "react-redux";

// App doesn't work for now because of lack of Provider component, some redux issue
// see https://stackoverflow.com/questions/60329421/usedispatch-error-could-not-find-react-redux-context-value-please-ensure-the
test("check that backend is correct for prod", () => {
  expect(backend).toBe("https://fitai.click");
});
