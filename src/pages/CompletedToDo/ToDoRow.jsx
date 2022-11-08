import React from "react";

const ToDoRow = ({ task }) => {
  return (
    <div className="card w-100 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{task.title}</h2>
        <p title={task.description.length > 30 ? task.description : ""}>
          {task.description.length > 30
            ? task.description.substring(0, 30) + "..."
            : task.description}
        </p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline badge-success">Completed</div>
        </div>
      </div>
    </div>
  );
};

export default ToDoRow;
