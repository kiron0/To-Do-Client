import React from "react";
import toast from "react-hot-toast";
import { FiDelete } from "react-icons/fi";
import Swal from "sweetalert2";
import auth from "../Login/Firebase/firebase.init";

const TaskList = ({
  title,
  description,
  serialize,
  _id,
  completed,
  refetch,
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
        fetch(
          `http://localhost:5000/todos?todoId=${id}&&uid=${auth?.currentUser?.uid}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              toast.success(result.message);
              refetch();
            }
          });
      }
    });
  };

  const handleCompleteInfo = async (id) => {
    await fetch(
      `http://localhost:5000/todos?todoId=${id}&&uid=${auth?.currentUser?.uid}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          refetch();
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
