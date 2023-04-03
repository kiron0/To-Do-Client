import React, { useState } from "react";
import useScrollToTop from "../../../hooks/useScrollToTop";
import moment from "moment";

type TodoListProps = {
  todo: any;
};

const ToDoSRow = ({ todo }: TodoListProps) => {
  useScrollToTop();
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="card w-100 bg-base-100 shadow-xl overflow-x-hidden">
      <div className="card-body">
        <h2 className="card-title">{todo?.title}</h2>
        <p>
          {todo?.description?.length > 100 && !showMore
            ? todo?.description?.slice(0, 100) + "..."
            : todo?.description}{" "}
          {todo?.description?.length > 100 && (
            <span
              onClick={() => setShowMore(!showMore)}
              className="text-primary cursor-pointer"
            >
              {showMore ? "Show Less" : "Show More"}
            </span>
          )}
        </p>
        {todo?.completed ? (
          <div className="card-actions justify-center py-5">
            <div className="badge badge-outline badge-success">Completed</div>
          </div>
        ) : (
          <div className="card-actions justify-center py-5">
            <div className="badge badge-outline badge-error">Pending</div>
          </div>
        )}
        <div className="card-actions justify-end">
          Created By -{" "}
          <div className="badge badge-outline badge-success">
            {todo?.addedBy?.name}
          </div>
          <div className="badge badge-outline badge-success">
            {todo?.addedBy?.email}
          </div>
        </div>
        {
          todo?.dueDate && (
            <div className="card-actions justify-end mt-2">
              Due Date -{" "}
              <div className="badge badge-outline badge-error">
                {moment(todo?.dueDate).format("Do MMMM YYYY")}
              </div>
            </div>
          )
        }
        <div className="card-actions justify-end mt-2">
          Created at -{" "}
          <div className="badge badge-outline badge-info">
            {todo?.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoSRow;
