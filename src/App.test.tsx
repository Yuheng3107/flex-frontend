import React from "react";
import { render } from "@testing-library/react";
import VideoFeed from "./components/Exercise/video";
const backend = "https://fitai.click";

test("renders without crashing", () => {
  const submitForm = (arg: string) => { console.log(arg) };
  const { baseElement } = render(<VideoFeed />);
  expect(baseElement).toBeDefined();
});
