import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import auth from "../Firebase/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const List = () => {
  const [myTasks, setMyTasks] = useState([]);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  // get my inventories
  useEffect(() => {
    const getOrders = async () => {
      const email = user?.email;
      const url = `https://todo-web-app2.herokuapp.com/my-tasks?email=${email}`;
      try {
        const { data } = await axios.get(url, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setMyTasks(data);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          signOut(auth);
          navigate("/login");
        }
      }
    };
    getOrders();
  }, [myTasks, user, navigate]);

  // delete confirmation sweet alert
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
        fetch(`https://todo-web-app2.herokuapp.com/tasks/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              setMyTasks(myTasks.filter((task) => task._id !== id));
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
        fetch(`https://todo-web-app2.herokuapp.com/tasks/${id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              myTasks(myTasks.map((task) => (task._id === id ? data : task)));
            }
          });
      }
    });
  };

  if (myTasks.length === 0) {
    return (
      <div>
        <div className="alert alert-warning text-center" role="alert">
          You don't have any items in your inventory.
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto container mx-auto h-screen">
      {myTasks.length > 0 ? (
        <table className="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Complete</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {myTasks.map((task, index) => (
              <tr key={task._id}>
                <th
                  style={{
                    textDecoration: `${task.completed && "line-through"}`,
                  }}
                >
                  {index + 1}
                </th>
                <td
                  style={{
                    textDecoration: `${task.completed && "line-through"}`,
                  }}
                >
                  {task.title}
                </td>
                <td
                  style={{
                    textDecoration: `${task.completed && "line-through"}`,
                  }}
                >
                  {task.description}
                </td>
                <td>
                  <button
                    onClick={() => handleCompleteInfo(task._id)}
                    className="btn btn-sm btn-error"
                    disabled={task?.completed && true}
                  >
                    {task?.completed ? "Completed" : "Complete"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-sm btn-warning"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <tr className="flex items-center justify-center mx-auto rounded">
          <td>
            <div className="alert alert-warning shadow-lg" role="alert">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>You don't have any task in your list</span>
              </div>
            </div>
          </td>
        </tr>
      )}
    </div>
  );
};

export default List;
