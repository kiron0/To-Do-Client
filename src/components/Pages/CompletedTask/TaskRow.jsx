import React from "react";

const TaskRow = ({ task }) => {
  return (
    <div class="card w-100 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{task.title}</h2>
        <p>{task.description}</p>
        <div class="card-actions justify-end">
          <div class="badge badge-outline badge-success">Completed</div>
        </div>
      </div>
    </div>
  );
};

export default TaskRow;
