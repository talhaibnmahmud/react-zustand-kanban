import { Task } from "@/components/task";

type ColumnProps = {
  state: string;
};

export const Column = ({ state }: ColumnProps) => {
  return (
    <div className="bg-zinc-200 min-h-80 px-4 py-2 rounded-lg shadow-md space-y-4">
      <p>{state}</p>

      <Task title="Todo" />
    </div>
  );
};
