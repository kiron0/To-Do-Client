import React, { useState } from "react";

type Props = {
  task: any;
};

const ToDoRow = ({ task }: Props) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="card w-100 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{task?.title}</h2>
        <p>
          {task?.description?.length > 100 && !showMore
            ? task?.description?.slice(0, 100) + "..."
            : task?.description}{" "}
          {task?.description?.length > 100 && (
            <span
              onClick={() => setShowMore(!showMore)}
              className="text-primary cursor-pointer"
            >
              {showMore ? "Show Less" : "Show More"}
            </span>
          )}
        </p>
        {/* <div className="card-actions justify-end">
          <div className="badge badge-outline badge-success">Completed</div>
        </div> */}
        <div className="card-actions justify-end pt-4">
          Created By -{" "}
          <div
            className="badge badge-outline badge-primary tooltip tooltip-left tooltip-primary"
            data-tip={task?.addedBy?.email}
          >
            {task?.addedBy?.name}
          </div>
        </div>
        <div className="card-actions justify-end mt-1">
          Created at -{" "}
          <div className="badge badge-outline badge-success">
            {task?.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoRow;
