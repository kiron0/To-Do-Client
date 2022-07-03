import React from "react";
import toast from "react-hot-toast";
import { FiDelete } from "react-icons/fi";
import Swal from "sweetalert2";

const ToDoSRow = ({ todo, refetch }) => {
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
        fetch(`http://localhost:5000/todoS/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              toast.success(`TodoS Deleted for ${todo?.addedBy?.name}`, {
                autoClose: 5000,
                pauseOnHover: true,
              });
              refetch();
            }
          });
      }
    });
  };

  return (
    <div className="card w-100 bg-base-100 shadow-xl">
      <label
        onClick={() => handleDelete(todo._id)}
        className="btn btn-sm btn-circle btn-error absolute right-2 top-2 text-white"
      >
        <FiDelete className="text-lg mr-[3px]" />
      </label>
      <div className="card-body">
        <h2 className="card-title">{todo?.title}</h2>
        <p>{todo?.description}</p>
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
          Added By -{" "}
          <div className="badge badge-outline badge-success">
            {todo?.addedBy?.name}
          </div>
          <div className="badge badge-outline badge-success">
            {todo?.addedBy?.email}
          </div>
        </div>
        <div className="card-actions justify-end mt-2">
          Added On -{" "}
          <div className="badge badge-outline badge-neutral">
            {todo?.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoSRow;
