import React from "react";
import renderer from "react-test-renderer";
import App from "./App";
import * as FirebaseAuth from "@firebase/auth"; 


jest.mock("@firebase/auth", () => {
  const originalModule = jest.requireActual("@firebase/auth");

  return {
    ...originalModule,
    initializeAuth: jest.fn(),
    getReactNativePersistence: jest.fn(),
  };
});

describe("<App />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
