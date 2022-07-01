import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import Loader from "../../Pages/Shared/Loader/Loader";
import auth from "../Login/Firebase/firebase.init";
import TaskList from "./TaskList";
const ManageTask = () => {
  const [modalTask, setModalTask] = useState({});
  const [user] = useAuthState(auth);
  const {
    data: taskData,
    isLoading,
    refetch,
  } = useQuery("tasks", () =>
    fetch(`http://localhost:5000/my-tasks?email=${auth?.currentUser?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const task = {
      email: user?.email,
      title: e.target.title.value,
      description: e.target.description.value,
    };
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          refetch();
          toast.success("Task Added Successfully");
          e.target.title.value = "";
          e.target.description.value = "";
        }
        setModalTask(null);
      });
  };

  const [titleField, setTitleField] = useState("");
  const [descriptionField, setDescriptionField] = useState("");

  const handleUpdateStock = async (event) => {
    event.preventDefault();

    await fetch(`http://localhost:5000/tasks/updateTask/${modalTask._id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: titleField || modalTask?.title,
        description: descriptionField || modalTask?.description,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount) {
          toast.success(`Task updated successfully`);
          setModalTask(null);
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="py-12 mt-16 lg:mt-24">
        <div className="card-actions justify-center bg-base-100">
          <label
            htmlFor="task-modal"
            className="btn btn-md btn-primary text-white uppercase"
          >
            Add Task
          </label>
        </div>

        <input type="checkbox" id="task-modal" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box text-center">
            <label
              htmlFor="task-modal"
              className="btn btn-sm btn-primary btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="font-bold text-2xl text-primary mb-6">
              Input Your Task Details
            </h3>
            <form
              onSubmit={handleTaskSubmit}
              className="grid grid-cols-1 gap-3 justify-items-center mt-2"
            >
              <input
                type="text"
                name="title"
                className="input input-bordered w-full max-w-sm mb-4"
                placeholder="Task Title"
                required
              />
              <textarea
                type="text"
                name="description"
                className="input input-bordered w-full max-w-sm"
                placeholder="Description"
                style={{ resize: "none", height: "10rem" }}
                required
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary text-white"
              />
            </form>
          </div>
        </div>
      </div>

      <div className="container w-full mx-auto">
        <div className="overflow-x-auto">
          {isLoading ? (
            <Loader />
          ) : taskData?.length > 0 ? (
            <>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Complete</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {taskData.map((product, ind) => (
                    <TaskList
                      key={product._id}
                      {...product}
                      serialize={ind}
                      refetch={refetch}
                      setModalProduct={setModalTask}
                    />
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <tr className="flex items-center justify-center mx-auto rounded">
              <td>
                <div className="alert alert-warning shadow-lg" role="alert">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
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
        {modalTask && (
          <>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold">{modalTask?.productName}</h3>
                <p>Update Your Task Details From Here</p>
                <form onSubmit={handleUpdateStock} action="" className="my-2">
                  <div className="my-4">
                    <label htmlFor="stock">Update Title</label>
                    <input
                      type="text"
                      placeholder="Put Your Product Name"
                      className="input input-bordered w-full my-3"
                      value={titleField || modalTask?.title}
                      onChange={(event) => setTitleField(event.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label htmlFor="stock">Update Description</label>
                    <textarea
                      type="text"
                      value={descriptionField || modalTask?.description}
                      className="input input-bordered w-full my-3"
                      placeholder="Description"
                      style={{ resize: "none", height: "8rem" }}
                      onChange={(event) =>
                        setDescriptionField(event.target.value)
                      }
                    />
                  </div>
                  <div className="text-right">
                    <button className="btn text-white">Update Task</button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ManageTask;
