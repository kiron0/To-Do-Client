import React from "react";
import { FiDelete } from "react-icons/fi";
import Swal from "sweetalert2";

const TaskList = ({
  title,
  description,
  serialize,
  _id,
  completed,
  refetch,
  email,
  setModalProduct,
}) => {
  /* Handle Product Delete */
  const handleDelete = (id) => {
    Swal.fire({
      text: "Are you sure you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
        fetch(`http://localhost:5000/tasks/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              refetch();
            }
          });
      }
    });
  };

  const handleCompleteInfo = (id) => {
    Swal.fire({
      text: "Are you sure you want to complete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Complete it!",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Completed!", "Your task has been completed.", "success");
        fetch(`http://localhost:5000/tasks/${id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              refetch();
            }
          });
      }
    });
  };

  return (
    <tr>
      <th
        style={{
          textDecoration: `${completed && "line-through"}`,
        }}
      >
        {serialize + 1}
      </th>
      <td
        style={{
          textDecoration: `${completed && "line-through"}`,
        }}
      >
        {title}
      </td>
      <td
        style={{
          textDecoration: `${completed && "line-through"}`,
        }}
      >
        {description}
      </td>
      <td>
        <button
          onClick={() => handleCompleteInfo(_id)}
          className="btn btn-sm btn-success text-white"
          disabled={completed && true}
        >
          {completed ? "Completed" : "Complete"}
        </button>
      </td>
      <td>
        <label
          type="button"
          htmlFor="my-modal-3"
          className="btn btn-sm btn-neutral text-white modal-button"
          disabled={completed && true}
          onClick={() => setModalProduct({ _id, title, description })}
        >
          Update
        </label>
      </td>
      <td>
        <button
          onClick={() => handleDelete(_id)}
          className="text-red-500 cursor-pointer"
        >
          <FiDelete className="text-2xl"></FiDelete>
        </button>
      </td>
    </tr>
  );
};

export default TaskList;
