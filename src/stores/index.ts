import { mountStoreDevtool } from "simple-zustand-devtools";
import type { StateCreator, StoreMutatorIdentifier } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

export type TaskStatus = "PLANNED" | "ONGOING" | "DONE";

type Task = {
  title: string;
  status: TaskStatus;
};

export type TaskStore = {
  tasks: Task[];
  draggedTask: string | null;
  addTask: (task: Task) => void;
  deleteTask: (title: string) => void;
  setDraggedTask: (title: string | null) => void;
  moveTask: (task: Task) => void;
};

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  //   type T = ReturnType<typeof f>;
  const loggedSet: typeof set = (...a) => {
    set(...a);
    console.log(...(name ? [`${name}:`] : []), get());
  };
  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;

export const useStore = createWithEqualityFn<TaskStore>()(
  devtools(
    persist(
      logger(
        (set) => ({
          tasks: [],
          draggedTask: null,
          addTask: (task) =>
            set(
              (store) => ({ tasks: [...store.tasks, task] }),
              false,
              "addTask"
            ),
          deleteTask: (title) =>
            set((store) => ({
              tasks: store.tasks.filter((task) => task.title !== title),
            })),
          setDraggedTask: (title) => set(() => ({ draggedTask: title })),
          moveTask: ({ title, status }: Task) =>
            set((store) => ({
              tasks: store.tasks.map((task) =>
                task.title === title ? { title, status } : task
              ),
            })),
        }),
        "Logger Middleware"
      ),
      { name: "tastStore" }
    )
  ),
  shallow
);

if (import.meta.env.DEV) {
  mountStoreDevtool("Store", useStore);
}
