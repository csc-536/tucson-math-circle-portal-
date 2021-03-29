import React from "react";
import App from "../components/App";
import { create } from "react-test-renderer";

describe("Should render login page", () => {
  test("testing base app", () => {
    let tree = create(<App />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
