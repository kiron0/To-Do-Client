import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import auth from "../Login/Firebase/firebase.init";
import { FaRegEye } from "react-icons/fa";
import { BASE_API } from "../../config";
import { useContext } from "react";
import { InitializeContext } from "../../App";

const TodoList = ({
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
  /* Handle ToDo Delete */
  const handleDelete = (id) => {
    Swal.fire({
      text: "Are you sure you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      background: theme === "night" ? "#333" : "#fff",
      color: theme === "night" ? "#fff" : "#333",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.value) {
        fetch(`${BASE_API}/toDoS?todoId=${id}&&uid=${auth?.currentUser?.uid}`, {
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
      `${BASE_API}/toDoS?todoId=${id}&&uid=${auth?.currentUser?.uid}`,
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
      <th>
        <input
          type="checkbox"
          onClick={() => handleCompleteInfo(_id)}
          className="checkbox"
          disabled={completed && true}
          checked={completed}
        ></input>
      </th>
      <th
        style={{
          textDecoration: `${completed && "line-through"}`,
        }}
        className="font-normal"
      >
        {title?.slice(0, 10)}
      </th>
      <th
        style={{
          textDecoration: `${completed && "line-through"}`,
        }}
        className="font-normal"
      >
        {description?.slice(0, 10)}
      </th>
      <th className="flex justify-center">
        <label
          type="button"
          htmlFor="detailsModal"
          className="btn btn-sm btn-primary btn-neutral text-white modal-button"
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
      </th>

      <th>
        <div className="card-actions flex justify-center">
          <div
            className={`badge badge-outline tooltip tooltip-right font-normal ${
              completed
                ? "badge-success tooltip-success"
                : "badge-error tooltip-error"
            }`}
            data-tip={completed ? "Complete" : "Pending"}
          >
            {completed ? "Complete" : "Pending....."}
          </div>
        </div>
      </th>
      <th>
        <label
          type="button"
          htmlFor="updateModal"
          className="btn btn-sm btn-success text-white modal-button"
          disabled={completed && true}
          onClick={() => setModalToDo({ _id, title, description })}
        >
          <i className="bx bxs-pen"></i>
        </label>
      </th>
      <th>
        <button
          onClick={() => handleDelete(_id)}
          className="btn btn-sm btn-error text-white"
        >
          <i className="bx bxs-trash"></i>
        </button>
      </th>
    </tr>
  );
};

export default TodoList;
