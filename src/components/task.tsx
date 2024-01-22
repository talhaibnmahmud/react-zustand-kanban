type TaskProps = {
  title: string;
};

const STATUS = "STATUS";
export const Task = ({ title }: TaskProps) => {
  return (
    <div className="min-h-20 bg-white rounded-md py-2 px-2 flex flex-col justify-between">
      <h3>{title}</h3>

      <div>
        <div></div>
        <div className="flex justify-end">
          <span className="bg-green-200 text-sm px-2 py-0.5 rounded-lg">
            {STATUS}
          </span>
        </div>
      </div>
    </div>
  );
};
