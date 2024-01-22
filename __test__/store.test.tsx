import { render } from "@testing-library/react";
import React, { useEffect } from "react";
import { expect, test, vi, type Mock } from "vitest";

import { useStore, type TaskStore } from "../src/stores";

test("sample", () => {
  expect(1).toEqual(1);
});

type TaskStorePartial = Partial<{ [K in keyof TaskStore]: TaskStore[K] }>;

const TestComponent = ({
  selector,
  effect,
}: {
  selector: (store: TaskStore) => TaskStore[keyof TaskStore] | TaskStorePartial;
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

test("Should add an item to the store and rerun the effect", () => {
  const selector = (store: TaskStore) => ({
    tasks: store.tasks,
    addTask: store.addTask,
  });
  const effect = vi
    .fn()
    .mockImplementation((items: ReturnType<typeof selector>) => {
      if (items.tasks.length === 0) {
        items.addTask({ title: "Test Task", status: "PLANNED" });
      }
    });

  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(2);
  expect(effect).toHaveBeenCalledWith(
    expect.objectContaining({
      tasks: [{ title: "Test Task", status: "PLANNED" }],
    })
  );
});

test("Should add an item to the store and rerun the effect", () => {
  let createdTask = false;
  const selector = (store: TaskStore) => ({
    tasks: store.tasks,
    addTask: store.addTask,
    deleteTask: store.deleteTask,
  });
  let currentItems: ReturnType<typeof selector> | null = null;
  const effect = vi
    .fn()
    .mockImplementation((items: ReturnType<typeof selector>) => {
      currentItems = items;
      if (!createdTask) {
        items.addTask({ title: "Test Task", status: "PLANNED" });
        createdTask = true;
        return;
      }
      if (items.tasks.length > 0) {
        items.deleteTask("Test Task");
      }
    });

  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(3);
  expect(
    (currentItems as unknown as ReturnType<typeof selector>).tasks
  ).toEqual([]);
});
