import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import auth from "../Login/Firebase/firebase.init";
import { FaRegEye } from "react-icons/fa";
import { BASE_API } from "../../../config";
import { useContext } from "react";
import { InitializeContext } from "../../../App";

const TaskToDo = ({
  title,
  description,
  serialize,
  _id,
  completed,
  refetch,
  setModalToDo,
  addedBy,
  createdAt,
}) => {
  const { theme } = useContext(InitializeContext);
  /* Handle Product Delete */
  const handleDelete = (id) => {
    Swal.fire({
      text: "Are you sure you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      background: theme ? "#333" : "#fff",
      color: theme ? "#fff" : "#333",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.value) {
        fetch(`${BASE_API}/todos?todoId=${id}&&uid=${auth?.currentUser?.uid}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
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
      `${BASE_API}/todos?todoId=${id}&&uid=${auth?.currentUser?.uid}`,
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
          toast.success(`${title} ${result.message}`);
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
      <td>
        <input
          type="checkbox"
          onClick={() => handleCompleteInfo(_id)}
          className="checkbox"
          disabled={completed && true}
          checked={completed}
        ></input>
      </td>
      <td
        style={{
          textDecoration: `${completed && "line-through"}`,
        }}
      >
        {title?.slice(0, 20)}
      </td>
      <td
        style={{
          textDecoration: `${completed && "line-through"}`,
        }}
      >
        {description?.slice(0, 25)}
      </td>
      <td>
        <label
          type="button"
          htmlFor="detailsModal"
          className="btn btn-sm btn-neutral text-white modal-button"
          onClick={() =>
            setModalToDo({
              _id,
              title,
              description,
              addedBy,
              createdAt,
              completed,
            })
          }
        >
          <FaRegEye />
        </label>
      </td>
      <td>
        <div className="card-actions">
          <div
            className={`badge badge-outline ${
              completed ? "badge-success" : "badge-error"
            }`}
          >
            {completed ? "Completed" : "Pending"}
          </div>
        </div>
      </td>
      <td>
        <label
          type="button"
          htmlFor="updateModal"
          className="btn btn-sm btn-success text-white modal-button"
          disabled={completed && true}
          onClick={() => setModalToDo({ _id, title, description })}
        >
          <i className="bx bxs-edit"></i>
        </label>
      </td>
      <td>
        <button
          onClick={() => handleDelete(_id)}
          className="btn btn-sm btn-error text-white"
        >
          <i className="bx bxs-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default TaskToDo;
