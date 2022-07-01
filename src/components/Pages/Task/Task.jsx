import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import List from "../List/List";
import auth from "../Login/Firebase/firebase.init";

const Task = () => {
  const [user] = useAuthState(auth);
  const [modalProduct, setModalProduct] = useState({});

  const [titleField, setTitleField] = useState("");
  const [descriptionField, setDescriptionField] = useState("");

  const handleUpdateInfo = (id) => {
    Swal.fire({
      text: "Are you sure you want to update this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Updated!", "Your task has been updated.", "success");
        fetch(`http://localhost:5000/tasks/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            title: modalProduct?.title,
            description: modalProduct?.description,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              toast.success(
                `${modalProduct?.productName} product updated successfully`
              );
              // myTasks(myTasks?.map((task) => (task._id === id ? data : task)));
            }
            setModalProduct(null);
          });
      }
    });
  };

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
      .then((data) => {
        if (data.insertedId) {
          toast.success("Task Added Successfully");
          e.target.title.value = "";
          e.target.description.value = "";
          setModalProduct(null);
        }
      });
  };

  return (
    <>
      <div className="py-12 mt-24">
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
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="font-bold text-2xl text-secondary mb-6">
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
                style={{ resize: "none", height: "8rem" }}
                required
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary w-28 max-w-xs text-white"
              />
            </form>
          </div>
        </div>
      </div>
      <List setModalProduct={setModalProduct}></List>
      {modalProduct && (
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
              <h3 className="text-lg font-bold">{modalProduct?.productName}</h3>
              <p>Update Your Product Details From Here</p>
              <form onSubmit={handleUpdateInfo} action="" className="my-2">
                <div className="my-4">
                  <label htmlFor="stock">Update Product Name</label>
                  <input
                    type="text"
                    placeholder="Put Your Product Name"
                    className="input input-bordered w-full my-3"
                    id="stock"
                    value={titleField || modalProduct?.title}
                    onChange={(event) => setTitleField(event.target.value)}
                  />
                </div>
                <div className="my-4">
                  <label htmlFor="stock">Update Available Quantity</label>
                  <input
                    type="number"
                    placeholder="Put Your Quantity"
                    className="input input-bordered w-full my-3"
                    id="stock"
                    value={descriptionField || modalProduct?.description}
                    onChange={(event) =>
                      setDescriptionField(event.target.value)
                    }
                  />
                </div>
                <div className="text-right">
                  <button className="btn text-white">Update Product</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Task;
