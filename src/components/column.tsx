import { useState } from "react";

import { Task } from "@/components/task";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore, type TaskStatus } from "@/stores";

type ColumnProps = {
  status: TaskStatus;
};

export const Column = ({ status }: ColumnProps) => {
  const tasks = useStore((state) =>
    state.tasks.filter((task) => task.status === status)
  );
  const addTask = useStore((state) => state.addTask);

  const [title, setTitle] = useState("");

  return (
    <Card className="min-h-80 px-4 py-2 bg-zinc-100 space-y-4">
      <CardHeader className="flex-row justify-between items-center p-0">
        <CardTitle>{status}</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Task</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  defaultValue=""
                  className="col-span-3"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Input
                  readOnly
                  id="status"
                  defaultValue={status}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button
                type="submit"
                onClick={() => {
                  addTask({ title, status });
                  setTitle("");
                }}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="px-0">
        {tasks.map((task) => (
          <Task key={task.title} title={task.title} />
        ))}
      </CardContent>
    </Card>
  );
};
