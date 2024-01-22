import { TrashIcon } from "@radix-ui/react-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useStore } from "@/stores";

type TaskProps = {
  title: string;
};

export const Task = ({ title }: TaskProps) => {
  const task = useStore((state) =>
    state.tasks.find((task) => task.title === title)
  );
  const deleteTask = useStore((state) => state.deleteTask);
  const setDraggedTask = useStore((state) => state.setDraggedTask);

  if (!task) return null;

  return (
    <Card
      className="space-y-2 cursor-move"
      draggable
      onDragStart={() => setDraggedTask(task.title)}
    >
      <CardContent className="py-2">
        <h3>{task.title}</h3>
      </CardContent>
      <CardFooter className="flex justify-between py-2">
        <Button variant="outline" onClick={() => deleteTask(task.title)}>
          <TrashIcon className="size-4" />
        </Button>
        <Badge className="bg-green-200 text-zinc-800">{task.status}</Badge>
      </CardFooter>
    </Card>
  );
};
