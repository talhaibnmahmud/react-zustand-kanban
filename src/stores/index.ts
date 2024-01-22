import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

export type TaskStatus = "PLANNED" | "ONGOING" | "DONE";

type Task = {
  title: string;
  status: TaskStatus;
};

type TastStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
};

export const useStore = createWithEqualityFn<TastStore>()(
  (set) => ({
    tasks: [{ title: "Test Task", status: "PLANNED" }],
    addTask: (task) => set((store) => ({ tasks: [...store.tasks, task] })),
  }),
  shallow
);
