import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import useTitle from "../../hooks/useTitle";
import Loader from "../../components/Loader/Loader";
import auth from "../../auth/Firebase/firebase.init";
import Swal from "sweetalert2";
import TodoList from "./ToDoList";
import { BASE_API } from "../../config";
import useScrollToTop from "../../hooks/useScrollToTop";
import Loading from "../../components/Loading/Loading";
import { InitializeContext } from "../../App";
import UpdateTodo from "./UpdateTodo";
import AddTodo from "./AddTodo";
import DetailsTodo from "./DetailsTodo";
import Pagination from "./Pagination";

const Fade = require("react-reveal/Fade");

const ManageToDo = () => {
  useScrollToTop();
  useTitle("Manage To Do");
  const { theme } = useContext(InitializeContext);
  const [modalToDo, setModalToDo] = useState({} as any);
  const [user] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size] = useState(10);

  const {
    data: toDosData = [] as any,
    isLoading,
    refetch,
  } = useQuery("toDos", () =>
    fetch(`${BASE_API}/myToDoS?email=${auth?.currentUser?.email}&page=${page}&limit=${size}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  useEffect(() => {
    setPageLoading(true);
    refetch();
    setPageLoading(false);
  }, [page, refetch]);

  const totalPages = toDosData?.pages;

  const [dateValue, setDateValue] = useState({
    startDate: null,
    endDate: null
  });

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
  const [descriptionField, setDescriptionField] = useState<string>("");

  const handleValueChange = (newValue: any) => {
    setDateValue(newValue);
  }

  const handleToCreateToDoS = (e: any) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    if (title.trim().length === 0) {
      toast.error("Please input your title!", {
        style: {
          background: "#333",
          padding: "15px",
          color: "#fff",
        },
      });
      return;
    } else if (description.trim().length === 0) {
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
      dueDate: dateValue.startDate,
      createdAt:
        new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      addedBy: {
        name: auth?.currentUser?.displayName,
        uid: auth?.currentUser?.uid,
        email: auth?.currentUser?.email,
      },
      completed: false,
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
        }
      });
  };

  const handleTitleField = (e: any) => {
    const titleText = e.target.value;
    setTitleField(titleText);
  }

  const handleDesField = (e: any) => {
    const desText = e.target.value;
    setDescriptionField(desText);
  }

  const handleUpdateToDoS = async (e: any) => {
    e.preventDefault();

    await fetch(`${BASE_API}/toDoS/updateToDoS?todoId=${modalToDo._id}&&uid=${auth?.currentUser?.uid}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: titleField || modalToDo?.title,
        description: descriptionField || modalToDo?.description,
        dueDate: dateValue.startDate || modalToDo?.dueDate,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Your ToDo has been updated.",
            confirmButtonText: "Ok, Got it!",
            background: theme === "night" ? "#333" : "#fff",
            color: theme === "night" ? "#fff" : "#333",
          })
          setModalToDo(null);
          refetch();
        }
      });
  };

  if (isLoading || pageLoading) {
    return <Loader />;
  }

  return (
    <section className="bg-base-100 h-screen">
      <div className="py-8 md:py-12">
        <div className="title text-center mb-5">
          <h3 className="text-3xl font-semibold">ToDo List</h3>
          <span>Here you will get all your ToDo list.</span>
        </div>
        {toDosData?.toDos?.length > 0 && (
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

        <AddTodo handleToCreateToDoS={handleToCreateToDoS} dateValue={dateValue} handleValueChange={handleValueChange} isLoading={isLoading} />
      </div>

      <div className="container w-full mx-auto -mt-4 md:-mt-8">
        <div className="overflow-x-auto shadow-md rounded-md">
          {isLoading ? (
            <Loading />
          ) : toDosData?.toDos?.length > 0 ? (
            <>
              <Fade top distance="20px">
                <table className="table-normal w-full bg-base-100">
                  <thead className="border-b">
                    <tr className="select-none">
                      <th>Sl</th>
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
                      ?.toDos?.map((todo: any, ind: number) => (
                        <TodoList
                          key={todo._id}
                          {...todo}
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
                      <span className="select-none text-center">
                        You don't have any todoS in your list
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
              <div className="flex justify-center items-center mx-auto pb-7">
                {toDosData?.toDos?.length <= 0 && (
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
          <UpdateTodo handleUpdateToDoS={handleUpdateToDoS} handleValueChange={handleValueChange} handleTitleField={handleTitleField} handleDesField={handleDesField} titleField={titleField} descriptionField={descriptionField} isLoading={isLoading} modalToDo={modalToDo} dateValue={dateValue} />
        )}
        {modalToDo && (
          <DetailsTodo modalToDo={modalToDo} />
        )}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </section>
  );
};

export default ManageToDo;
