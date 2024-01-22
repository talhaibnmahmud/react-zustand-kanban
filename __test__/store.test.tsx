import { render } from "@testing-library/react";
import React, { useEffect } from "react";
import { expect, test, vi, type Mock } from "vitest";

import { useStore, type TaskStore } from "../src/stores";

test("sample", () => {
  expect(1).toEqual(1);
});

const TestComponent = ({
  selector,
  effect,
}: {
  selector: (store: TaskStore) => TaskStore[keyof TaskStore];
  effect: Mock;
}) => {
  const items = useStore(selector);

  useEffect(() => effect(items), [effect, items]);

  return null;
};

test("Should return default value at the start", () => {
  const selector = (store: TaskStore) => store.tasks;
  const effect = vi.fn();

  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledWith([]);
});

// test("Should add an item to the store and rerun the effect", () => {
//   const selector = (store: TaskStore) => store.addTask;
//   const effect = vi.fn();

//   render(<TestComponent selector={selector} effect={effect} />);
//   expect(effect).toHaveBeenCalledWith([]);
// });
