import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useQuery } from "react-query";
import useTitle from "../../hooks/useTitle";
import Loader from "../../components/Loader/Loader";
import auth from "../../auth/Firebase/firebase.init";
import Swal from "sweetalert2";
import TodoList from "./ToDoList";
import { BASE_API } from "../../config";
import useScrollToTop from "../../hooks/useScrollToTop";
import useCompletedToDos from "../../hooks/useCompletedToDos";
import Loading from "../../components/Loading/Loading";
import { InitializeContext } from "../../App";

const Fade = require("react-reveal/Fade");

const ManageToDo = () => {
  useScrollToTop();
  useTitle("Manage To Do");
  const { theme } = useContext(InitializeContext);
  const [modalToDo, setModalToDo] = useState({} as any);
  const [user] = useAuthState(auth);

  const {
    data: toDosData = [] as any,
    isLoading,
    refetch,
  } = useQuery("toDos", () =>
    fetch(`${BASE_API}/myToDoS?email=${auth?.currentUser?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  const HandleSearchToDos = async (e: any) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    if (!searchText) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Search field can't be empty!",
        confirmButtonText: "Ok, Got it!",
        background: theme === "night" ? "#333" : "#fff",
        color: theme === "night" ? "#fff" : "#333",
      })
    }

    await fetch(
      `${BASE_API}/myToDoS/search?email=${auth?.currentUser?.email}&title=${searchText}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.result) {
          Swal.fire({
            icon: "success",
            title: result.result.title,
            text: result.result.description,
            confirmButtonText: "Ok, Got it!",
            background: theme === "night" ? "#333" : "#fff",
            color: theme === "night" ? "#fff" : "#333",
          })
          e.target.search.value = "";
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.message,
            confirmButtonText: "Ok, Got it!",
            background: theme === "night" ? "#333" : "#fff",
            color: theme === "night" ? "#fff" : "#333",
          })
          e.target.search.value = "";
        }
      });
  };

  const [titleField, setTitleField] = useState<string>("");
  const [titleFieldError, setTitleFieldError] = useState<string>("");
  // const [titleFieldCount, setTitleFieldCount] = useState<number>(0);
  const [descriptionField, setDescriptionField] = useState<string>("");
  const [desFieldError, setDesFieldError] = useState<string>("");
  // const [desFieldCount, setDesFieldCount] = useState<number>(0);

  const handleToCreateToDoS = (e: any) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    if (title.length === 0) {
      toast.error("Please input your title!", {
        style: {
          background: "#333",
          padding: "15px",
          color: "#fff",
        },
      });
      return;
    } else if (description.length === 0) {
      toast.error("Please input your description!", {
        style: {
          background: "#333",
          padding: "15px",
          color: "#fff",
        },
      });
      return;
    }

    const createToDo = {
      email: user?.email,
      title: e.target.title.value,
      description: e.target.description.value,
      createdAt:
        new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      addedBy: {
        name: auth?.currentUser?.displayName,
        uid: auth?.currentUser?.uid,
        email: auth?.currentUser?.email,
      },
    };
    fetch(`${BASE_API}/createToDo?uid=${auth?.currentUser?.uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(createToDo),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          refetch();
          e.target.reset();
          // setTitleTextCount(0);
          // setDesTextCount(0);
          // setDesError("");
          // setTitleError("");
          // setTitleField("");
          // setDescriptionField("");
          // setTitleFieldCount(0);
          // setDesFieldCount(0);
          // setDesFieldError("");
          // setTitleFieldError("");
        }
      });
  };

  const handleTitleField = (e: any) => {
    const titleText = e.target.value;
    if (titleText.length > 0) {
      setTitleFieldError("");
    } else {
      setTitleFieldError("Please input your title!");
    }
    // setTitleFieldCount(titleText.length);
    setTitleField(titleText);
  }

  const handleDesField = (e: any) => {
    const desText = e.target.value;
    if (desText.length > 0) {
      setDesFieldError("");
    } else {
      setDesFieldError("Please input your description!");
    }
    // setDesFieldCount(desText.length);
    setDescriptionField(desText);
  }

  const handleUpdateToDoS = async (e: any) => {
    e.preventDefault();

    await fetch(`${BASE_API}/toDoS/updateToDoS/${modalToDo._id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: titleField || modalToDo?.title,
        description: descriptionField || modalToDo?.description,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount) {
          toast.success(`ToDo updated successfully`);
          setModalToDo(null);
          refetch();
        }
      });
  };

  const { completedToDos } = useCompletedToDos();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="bg-base-100 h-screen">
      <div className="py-8 md:py-12">
        <div className="title text-center mb-5">
          <h3 className="text-3xl font-semibold">ToDo List</h3>
          <span>Here you will get all your ToDo list.</span>
        </div>
        {toDosData?.length > 0 && (
          <div className="header bg-base-100 rounded-md shadow-md container mx-auto w-[22rem] md:w-full py-4 md:py-0">
            <div className="flex-wrap gap-4 navbar">
              <div className="sm:flex-1 flex-col sm:flex-row w-full">
                <div className="form-control">
                  <form onSubmit={HandleSearchToDos}>
                    <div className="input-group">
                      <input
                        type="text"
                        name="search"
                        placeholder="Search by title"
                        className="input input-bordered md:input-md w-[16rem] md:w-full"
                      />
                      <button className="btn btn-square">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="flex-none gap-2 justify-center items-center w-full sm:justify-start sm:items-start sm:w-auto">
                <label
                  htmlFor="toDosModal"
                  className="btn btn-md btn-primary text-white uppercase"
                >
                  <i className="bx bxs-pen text-lg mr-1"></i> Add new ToDoS
                </label>
              </div>
            </div>
          </div>
        )}

        <form
          onSubmit={handleToCreateToDoS}
          className="grid grid-cols-1 gap-3 justify-items-center mt-2"
        >
          <input type="checkbox" id="toDosModal" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-semibold flex justify-center">
                Input Your To Do Details
              </h3>
              <div className="name border rounded p-3 relative mt-10">
                <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                  <h3 className="text-xs font-poppins">Put your title</h3>
                </div>
                <div className={`input-group flex items-center my-2 border p-3 rounded-md mt-2`}>
                  <div className="icon">
                    <i className="bx bxs-pen"></i>
                  </div>
                  <input
                    type="text"
                    name="title"
                    onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                    className="form-control outline-none pl-4 w-full bg-transparent"
                    placeholder="Title"
                  />
                </div>
                {/* {titleError && (
                  <small className="flex flex-col pt-2 text-red-500">
                    {titleError}
                  </small>
                )} */}
                {/* <small className={`pt-2 ${titleTextCount < 10 || titleTextCount > 30 ? "flex flex-col text-red-500" : ""}`}>
                  {`Word Count: ${titleTextCount}/30`}

                </small> */}
                {/* <small className={`${titleTextCount < 10 || titleTextCount > 30 ? "flex flex-col text-red-500" : ""}`}>

                  {titleTextCount < 10 ? "You can't write less than 10 words" : titleTextCount > 30 && "You can't write more than 30 words"}
                </small> */}
              </div>

              <div className="name border rounded p-3 relative mt-10">
                <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                  <h3 className="text-xs font-poppins">Put your description</h3>
                </div>
                <div className={`input-group flex items-center my-2 border p-3 rounded-md mt-2`}>
                  <div className="icon">
                    <i className="bx bx-detail"></i>
                  </div>
                  <textarea
                    typeof="text"
                    name="description"
                    onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                    className={`form-control outline-none pl-4 w-full bg-transparent`}
                    placeholder="Description"
                    style={{ resize: "none", height: "10rem" }}
                  />
                </div>
                {/* {desError && (
                  <small className="flex flex-col pt-2 text-red-500">
                    {desError}
                  </small>
                )} */}
                {/* <small className={`pt-2 ${desTextCount < 50 || desTextCount > 200 ? "flex flex-col text-red-500" : ""}`}>
                  {`Word Count: ${desTextCount}/200`}

                </small> */}
                {/* <small className={`${desTextCount < 50 || desTextCount > 200 ? "flex flex-col text-red-500" : ""}`}>

                  {desTextCount < 50 ? "You can't write less than 50 words" : desTextCount > 200 && "You can't write more than 200 words"}
                </small> */}
              </div>

              <div className="modal-action">
                <label htmlFor="toDosModal" className="btn btn-warning">
                  <i className="bx bx-x text-xl"></i> Cancel
                </label>

                {isLoading ? (
                  <button className="btn btn-primary" type="button">
                    <PulseLoader size={8} color="#fff" />
                  </button>
                ) : (
                  <button className={`btn btn-success`} type="submit">
                    <i className="bx bxs-pen text-lg"></i> Add ToDo
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="container w-full mx-auto -mt-4 md:-mt-8">
        <div className="overflow-x-auto shadow-md rounded-md">
          {isLoading ? (
            <Loading />
          ) : toDosData?.length > 0 ? (
            <>
              <Fade top distance="20px">
                <table className="table-normal w-full bg-base-100">
                  <thead className="border-b">
                    <tr className="select-none">
                      <th>
                        <i className="bx bxl-kickstarter text-lg"></i>
                      </th>
                      <th>Complete</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Details</th>
                      <th>Status</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {toDosData
                      ?.slice(0)
                      .reverse()
                      .map((task: any, ind: number) => (
                        <TodoList
                          key={task._id}
                          {...task}
                          serialize={ind}
                          refetch={refetch}
                          setModalToDo={setModalToDo}
                        />
                      ))}
                  </tbody>
                </table>
              </Fade>
            </>
          ) : (
            <div className="md:mt-16">
              <tr className="flex items-center justify-center mx-auto rounded my-6">
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
                      <span className="select-none">
                        You don't have any todoS in your list
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
              <div className="flex justify-center items-center mx-auto pb-7">
                {toDosData?.length <= 0 && (
                  <label
                    htmlFor="toDosModal"
                    className="btn btn-md btn-primary text-white uppercase"
                  >
                    <i className="bx bxs-pen text-lg mr-1"></i> Add new ToDoS
                  </label>
                )}
              </div>
            </div>
          )}
        </div>
        {modalToDo && (
          <>
            <input type="checkbox" id="updateModal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box relative">
                <p className="font-semibold flex justify-center">
                  Update Your ToDo From Here
                </p>
                <form onSubmit={handleUpdateToDoS} action="" className="my-2">
                  <div className="name border rounded p-3 relative mt-10">
                    <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                      <h3 className="text-xs font-poppins">
                        Update your title
                      </h3>
                    </div>
                    <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2">
                      <div className="icon">
                        <i className="bx bxs-pen"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Update Your Title"
                        className="form-control outline-none pl-4 w-full bg-transparent"
                        value={titleField || modalToDo?.title}
                        onChange={handleTitleField}
                      />
                    </div>
                    {titleFieldError && (
                      <small className="flex flex-col pt-2 text-red-500">
                        {titleFieldError}
                      </small>
                    )}
                    {/* <small className={`pt-2 ${titleFieldCount < 10 || titleFieldCount > 30 ? "flex flex-col text-red-500" : ""}`}>
                      {`Word Count: ${titleFieldCount}/30`}

                    </small> */}
                    {/* <small className={`${titleFieldCount < 10 || titleFieldCount > 30 ? "flex flex-col text-red-500" : ""}`}>

                      {titleFieldCount < 10 ? "You can't write less than 10 words" : titleFieldCount > 30 && "You can't write more than 30 words"}
                    </small> */}
                  </div>

                  <div className="name border rounded p-3 relative mt-10">
                    <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                      <h3 className="text-xs font-poppins">
                        Update your description
                      </h3>
                    </div>
                    <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2">
                      <div className="icon">
                        <i className="bx bx-detail"></i>
                      </div>
                      <textarea
                        typeof="text"
                        value={descriptionField || modalToDo?.description}
                        className="form-control outline-none pl-4 w-full bg-transparent"
                        placeholder="Description"
                        style={{ resize: "none", height: "8rem" }}
                        onChange={handleDesField}
                      />
                    </div>
                    {desFieldError && (
                      <small className="flex flex-col pt-2 text-red-500">
                        {desFieldError}
                      </small>
                    )}
                    {/* <small className={`pt-2 ${desFieldCount < 50 || desFieldCount > 200 ? "flex flex-col text-red-500" : ""}`}>
                      {`Word Count: ${desFieldCount}/200`}

                    </small> */}
                    {/* <small className={`${desFieldCount < 50 || desFieldCount > 200 ? "flex flex-col text-red-500" : ""}`}>

                      {desFieldCount < 50 ? "You can't write less than 50 words" : desFieldCount > 200 && "You can't write more than 200 words"}
                    </small> */}
                  </div>

                  <div className="modal-action">
                    <label htmlFor="updateModal" className="btn btn-warning">
                      <i className="bx bx-x text-xl"></i> Cancel
                    </label>

                    {isLoading ? (
                      <button className="btn btn-primary" type="button">
                        <PulseLoader size={8} color="#fff" />
                      </button>
                    ) : (
                      <button className={`btn btn-success`} type="submit">
                        <i className="bx bx-pen text-lg"></i> Update ToDo
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
        {modalToDo && (
          <>
            <input type="checkbox" id="detailsModal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box relative overflow-x-hidden">
                <p className="font-semibold flex justify-center">
                  Full Details of your ToDo
                </p>
                <div className="name border rounded p-3 relative mt-10">
                  <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                    <h3 className="text-xs font-poppins">Your title</h3>
                  </div>
                  <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2">
                    <div className="icon">
                      <i className="bx bxs-pen"></i>
                    </div>
                    <p className="overflow-auto max-h-20 select-none pl-2">
                      {modalToDo?.title}
                    </p>
                  </div>
                </div>

                <div className="name border rounded p-3 relative mt-10">
                  <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                    <h3 className="text-xs font-poppins">Your description</h3>
                  </div>
                  <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2">
                    <div className="icon">
                      <i className="bx bx-detail"></i>
                    </div>
                    <p className="overflow-auto overflow-x-hidden max-h-36 select-none pl-2">
                      {modalToDo?.description}
                    </p>
                  </div>
                </div>

                <div className="card-actions justify-end my-4">
                  <div
                    className={`badge badge-outline ${modalToDo?.completed ? "badge-success" : "badge-error"
                      }`}
                  >
                    {modalToDo?.completed ? "Completed" : "Pending"}
                  </div>
                </div>
                <div className="card-actions justify-end">
                  Created By -{" "}
                  <div
                    className="badge badge-outline badge-primary tooltip tooltip-left tooltip-primary select-none"
                    data-tip={modalToDo?.addedBy?.email}
                  >
                    {modalToDo?.addedBy?.name}
                  </div>
                </div>
                <div className="card-actions justify-end mt-3">
                  Created at -{" "}
                  <div className="badge badge-outline badge-info">
                    {modalToDo?.createdAt}
                  </div>
                </div>
                <div className="modal-action">
                  <label htmlFor="detailsModal" className="btn btn-warning">
                    <i className="bx bx-x text-xl"></i> Close
                  </label>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="card-actions justify-center py-12 bg-base-100">
        {completedToDos?.length > 0 && (
          <Link to="/completed">
            <button className="btn btn-md btn-primary text-white uppercase">
              <i className="bx bxs-check-circle mr-1 text-lg"></i> See all
              completed ToDos
            </button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default ManageToDo;
