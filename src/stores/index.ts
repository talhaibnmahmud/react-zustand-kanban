import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

export type TaskStatus = "PLANNED" | "ONGOING" | "DONE";

type Task = {
  title: string;
  status: TaskStatus;
};

type TastStore = {
  tasks: Task[];
};

export const useStore = createWithEqualityFn<TastStore>()(
  () => ({
    tasks: [{ title: "Test Task", status: "PLANNED" }],
  }),
  shallow
);
