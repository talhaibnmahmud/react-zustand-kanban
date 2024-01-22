import { Task } from "@/components/task";
import { useStore, type TaskStatus } from "@/stores";

type ColumnProps = {
  status: TaskStatus;
};

export const Column = ({ status }: ColumnProps) => {
  const tasks = useStore((state) =>
    state.tasks.filter((task) => task.status === status)
  );

  console.log({ tasks });

  return (
    <div className="bg-zinc-200 min-h-80 px-4 py-2 rounded-lg shadow-md space-y-4">
      <p>{status}</p>

      {tasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}
    </div>
  );
};
