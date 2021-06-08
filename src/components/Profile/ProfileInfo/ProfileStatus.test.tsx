import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="hello world!!!" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("hello world!!!");
  });

  test("after creation span should be displaied", () => {
    const component = create(<ProfileStatus status="hello world!!!" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span).not.toBeNull();
  });

  test("after creation span should be displaied witn correct status", () => {
    const component = create(<ProfileStatus status="hello world!!!" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span.children[0]).toBe("hello world!!!");
  });

  test("input should be displaied in editMode instead of span", () => {
    const component = create(<ProfileStatus status="hello world!!!" />);
    const root = component.root;
    let span = root.findByType("span");
    span.props.onClick();
    let input = root.findByType("input");
    expect(input.props.value).toBe("hello world!!!");
  });
});
