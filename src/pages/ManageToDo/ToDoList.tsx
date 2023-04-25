import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import auth from "../../auth/Firebase/firebase.init";
import { FaRegEye } from "react-icons/fa";
import { BASE_API } from "../../config";
import { useContext } from "react";
import { InitializeContext } from "../../App";

type TodoListProps = {
  title: string,
  description: string,
  serialize: string,
  _id: string,
  completed: boolean,
  refetch: () => void,
  setModalToDo: any,
  addedBy: string,
  createdAt: string,
  dueDate: string,
}

const TodoList = (todo: TodoListProps) => {

  const { title,
    description,
    _id,
    serialize,
    refetch,
    completed,
    setModalToDo,
    addedBy,
    dueDate,
    createdAt } = todo;

  const { theme } = useContext(InitializeContext);
  /* Handle ToDo Delete */
  const handleDelete = (id: number) => {
    Swal.fire({
      text: "Are you sure you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      background: theme === "night" ? "#333" : "#fff",
      color: theme === "night" ? "#fff" : "#333",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result: any) => {
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
              Swal.fire({
                text: result.message,
                icon: "success",
                background: theme === "night" ? "#333" : "#fff",
                color: theme === "night" ? "#fff" : "#333",
                confirmButtonText: "Ok, Got it!",
              });
              refetch();
            }
          });
      }
    });
  };

  const handleCompleteInfo = (id: number) => {
    Swal.fire({
      text: "Are you sure you want to complete this?",
      icon: "warning",
      showCancelButton: true,
      background: theme === "night" ? "#333" : "#fff",
      color: theme === "night" ? "#fff" : "#333",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Complete it!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        fetch(
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
              todo.refetch();
            }
          });
      }
    });
  };

  return (
    <tr>
      <th>
        {serialize + 1}
      </th>
      <th>
        <span className="tooltip" data-tip="Click to completed">
          <input
            type="checkbox"
            onClick={() => handleCompleteInfo(_id as any)}
            className="checkbox checkbox-xs checkbox-primary"
            disabled={completed && true}
            checked={completed}
          ></input>
        </span>
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
          typeof="button"
          htmlFor="detailsModal"
          className="btn btn-xs btn-primary btn-neutral text-white modal-button"
          onClick={() =>
            setModalToDo({
              _id,
              title,
              description,
              addedBy,
              createdAt,
              completed,
              dueDate,
            } as any)
          }
        >
          <FaRegEye />
        </label>
      </th>

      <th>
        <div className="card-actions flex justify-center">
          <div
            className={`badge badge-outline tooltip tooltip-right font-normal ${completed
              ? "badge-success tooltip-success"
              : "badge-error tooltip-error"
              }`}
            data-tip={completed ? "Complete" : "Pending"}
          >
            {completed ? "Completed" : "Pending"}
          </div>
        </div>
      </th>
      <th>
        <label
          typeof="button"
          htmlFor="updateModal"
          className={`btn btn-xs btn-success text-white modal-button ${completed && "btn-disabled"}`}
          onClick={() => setModalToDo({ _id, title, description, dueDate }) as any}
        >
          <i className="bx bxs-pen"></i>
        </label>
      </th>
      <th>
        <button
          onClick={() => handleDelete(_id as any)}
          className="btn btn-xs btn-error text-white"
        >
          <i className="bx bxs-trash"></i>
        </button>
      </th>
    </tr>
  );
};

export default TodoList;
