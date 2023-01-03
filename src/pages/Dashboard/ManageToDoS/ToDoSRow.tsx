import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { BASE_API } from "../../../config";
import useScrollToTop from "../../../hooks/useScrollToTop";

type TodoListProps = {
  todo: any;
  refetch: () => void;
};

const ToDoSRow = ({ todo, refetch }: TodoListProps) => {
  useScrollToTop();
  const [showMore, setShowMore] = useState(false);

  const handleDelete = (id: any) => {
    Swal.fire({
      text: "Are you sure you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result: any) => {
      if (result.value) {
        fetch(`${BASE_API}/todoS/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              toast.success(`TodoS Deleted for ${todo?.addedBy?.name}`);
              refetch();
            }
          });
      }
    });
  };

  return (
    <div className="card w-100 bg-base-100 shadow-xl overflow-x-hidden">
      <label
        onClick={() => handleDelete(todo._id)}
        className="btn btn-sm btn-error absolute right-2 top-2 text-white"
      >
        <i className="bx bxs-trash"></i>
      </label>
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
        <div className="card-actions justify-end mt-2">
          Created at -{" "}
          <div className="badge badge-outline badge-neutral">
            {todo?.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoSRow;
