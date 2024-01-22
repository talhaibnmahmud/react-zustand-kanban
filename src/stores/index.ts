import { mountStoreDevtool } from "simple-zustand-devtools";
import { devtools, persist } from "zustand/middleware";
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
  devtools(
    persist(
      (set) => ({
        tasks: [],
        draggedTask: null,
        addTask: (task) =>
          set((store) => ({ tasks: [...store.tasks, task] }), false, "addTask"),
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
      { name: "tastStore" }
    )
  ),
  shallow
);

if (import.meta.env.DEV) {
  mountStoreDevtool("Store", useStore);
}
