import React, { useState, useContext } from 'react'
import useScrollToTop from '../../../hooks/useScrollToTop';
import { BASE_API } from '../../../config';
import Swal from 'sweetalert2';
import auth from '../../../auth/Firebase/firebase.init';
import { InitializeContext } from '../../../App';
import moment from 'moment';

type TodoListProps = {
          todo: any;
          fetchToDos: () => void;
};

export default function ToDoSTable({ todo, fetchToDos }: TodoListProps) {
          useScrollToTop();
          const { theme } = useContext(InitializeContext);
          const [showMore, setShowMore] = useState<boolean>(false);

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
                                                                                icon: "success",
                                                                                title: "Deleted!",
                                                                                text: `TodoS Deleted for ${todo?.addedBy?.name}`,
                                                                                confirmButtonText: "Ok, Got it!",
                                                                                background: theme === "night" ? "#333" : "#fff",
                                                                                color: theme === "night" ? "#fff" : "#333",
                                                                      });
                                                                      fetchToDos();
                                                            }
                                                  });
                              }
                    });
          };

          return (
                    <div className="card w-full bg-base-100 shadow-xl overflow-x-hidden">
                              <label
                                        onClick={() => handleDelete(todo._id)}
                                        className="btn btn-xs btn-error absolute right-2 top-2 text-white"
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
                                        {
                                                  todo?.dueDate && (
                                                            <div className="card-actions justify-end mt-2">
                                                                      Due Date -{" "}
                                                                      <div className="badge badge-outline badge-error">
                                                                                {moment(todo?.dueDate).format("Do MMMM YYYY")}
                                                                      </div>
                                                            </div>
                                                  )
                                        }
                                        <div className="card-actions justify-end mt-2">
                                                  Created at -{" "}
                                                  <div className="badge badge-outline badge-info">
                                                            {todo?.createdAt}
                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}
