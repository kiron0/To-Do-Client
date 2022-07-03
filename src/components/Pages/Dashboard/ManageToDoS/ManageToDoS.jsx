import React from "react";
import { useQuery } from "react-query";
import Loader from "../../Shared/Loader/Loader";
import ToDoSRow from "./ToDoSRow";

const ManageToDoS = () => {
  const {
    data: toDosData,
    isLoading,
    refetch,
  } = useQuery("todos", () =>
    fetch(`http://localhost:5000/toDoS`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  return (
    <div className="lg:px-4 py-7 bg-base-100">
      <div className="title mb-4 px-4">
        <h3 className="text-2xl font-semibold">Completed ToDoS</h3>
        <span>
          You can see all the completed tasks which you're completed already.
        </span>
      </div>
      <div>
        {isLoading ? (
          <Loader />
        ) : toDosData?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto lg:px-4">
            {toDosData?.map((todo) => (
              <ToDoSRow key={todo._id} todo={todo} refetch={refetch} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center mx-auto rounded">
            <div>
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
                  <span>No completed task in your list</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageToDoS;
