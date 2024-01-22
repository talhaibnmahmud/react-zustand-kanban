import { useStore } from "@/stores";

type TaskProps = {
  title: string;
};

export const Task = ({ title }: TaskProps) => {
  const task = useStore((state) =>
    state.tasks.find((task) => task.title === title)
  );

  if (!task) return null;

  return (
    <div className="min-h-20 bg-white rounded-md py-2 px-2 flex flex-col justify-between">
      <h3>{task.title}</h3>

      <div>
        <div></div>
        <div className="flex justify-end">
          <span className="bg-green-200 text-sm px-2 py-0.5 rounded-lg">
            {task.status}
          </span>
        </div>
      </div>
    </div>
  );
};
