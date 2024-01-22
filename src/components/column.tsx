import { Task } from "@/components/task";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore, type TaskStatus } from "@/stores";

type ColumnProps = {
  status: TaskStatus;
};

export const Column = ({ status }: ColumnProps) => {
  const tasks = useStore((state) =>
    state.tasks.filter((task) => task.status === status)
  );
  const addTask = useStore((state) => state.addTask);

  return (
    <Card className="min-h-80 px-4 py-2 bg-zinc-100 space-y-4">
      <CardHeader className="flex-row justify-between items-center p-0">
        <CardTitle>{status}</CardTitle>
        <Button onClick={() => addTask({ title: "New Task", status: status })}>
          Add
        </Button>
      </CardHeader>

      {tasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}
    </Card>
  );
};
