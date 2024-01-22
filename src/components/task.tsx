import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
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
    <CardContent className="min-h-20 bg-white rounded-md py-2 px-2 flex flex-col justify-between">
      <h3>{task.title}</h3>

      <div>
        <div></div>
        <div className="flex justify-end">
          <Badge className="bg-green-200 text-zinc-800">{task.status}</Badge>
        </div>
      </div>
    </CardContent>
  );
};
