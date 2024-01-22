import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

export type TaskStatus = "PLANNED" | "ONGOING" | "DONE";

type Task = {
  title: string;
  status: TaskStatus;
};

type TastStore = {
  tasks: Task[];
  draggedTask: string | null;
  addTask: (task: Task) => void;
  deleteTask: (title: string) => void;
  setDraggedTask: (title: string | null) => void;
  moveTask: (task: Task) => void;
};

export const useStore = createWithEqualityFn<TastStore>()(
  (set) => ({
    tasks: [{ title: "Test Task", status: "PLANNED" }],
    draggedTask: null,
    addTask: (task) => set((store) => ({ tasks: [...store.tasks, task] })),
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
  shallow
);
