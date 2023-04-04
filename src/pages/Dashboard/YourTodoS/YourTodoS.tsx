import React, { useState, useEffect } from 'react'
import useScrollToTop from '../../../hooks/useScrollToTop';
import useTitle from '../../../hooks/useTitle';
import auth from '../../../auth/Firebase/firebase.init';
import { BASE_API } from '../../../config';
import Loader from '../../../components/Loader/Loader';
import ToDoSTable from './ToDoSTable';

const Fade = require("react-reveal/Fade");

export default function YourTodoS() {
          useScrollToTop();
          useTitle("Manage Your ToDoS");
          const [toDosData, setToDosData] = useState<any>([]);
          const [filterToDoS, setFilterToDoS] = useState<string>("all");
          const [loading, setLoading] = useState<boolean>(false);

          const handleFilterToDoS = (e: any) => {
                    const value = e.target.value.toLowerCase();
                    setFilterToDoS(value);
          };

          useEffect(() => {
                    setLoading(true);
                    fetch(`${BASE_API}/myToDoS/filtered?email=${auth?.currentUser?.email}&&filter=${filterToDoS}`, {
                              headers: {
                                        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                              },
                    })
                              .then((res) => res.json())
                              .then((data) => {
                                        if (data?.result?.length > 0) {
                                                  setToDosData(data?.result);
                                                  setLoading(false);
                                        } else {
                                                  setToDosData([]);
                                                  setLoading(false);
                                        }
                              });
          }, [filterToDoS]);


          const fetchToDos = async () => {
                    const res = await fetch(`${BASE_API}/myToDoS?email=${auth?.currentUser?.email}`, {
                              headers: {
                                        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                              },
                    });
                    const data = await res.json();
                    if (data?.length > 0) {
                              setToDosData(data);
                    } else {
                              setToDosData([]);
                    }
          };

          return (
                    <section className="lg:px-4 py-7 bg-base-100">
                              <div className='flex flex-col md:flex-row justify-between items-center mb-7 md:mb-0'>
                                        <div className="title mb-4 md:mb-0 px-4 md:pb-7 lg:pb-4 md:w-2/3">
                                                  <h3 className="text-2xl font-semibold">Manage Your ToDoS</h3>
                                                  <span>You can see all the toDoS which are added by you.</span>
                                        </div>
                                        <div className='form-control max-w-xs md:pb-7 lg:pb-4 md:w-1/4 flex w-full justify-center'>
                                                  <label className="label">
                                                            <span className="label-text">Filter by status</span>
                                                  </label>
                                                  <select className="select select-bordered w-full max-w-xs"
                                                            onChange={handleFilterToDoS}
                                                            defaultValue={filterToDoS}
                                                  >
                                                            <option>All</option>
                                                            <option>Completed</option>
                                                            <option>Pending</option>
                                                  </select>
                                        </div>
                              </div>
                              <div>
                                        {loading ? (
                                                  <Loader />
                                        ) : toDosData?.length > 0 ? (
                                                  <Fade top distance="20px">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto lg:px-4 lg:mt-10">
                                                                      {toDosData?.map((todo: any) => (
                                                                                <ToDoSTable key={todo._id} todo={todo} fetchToDos={fetchToDos} />
                                                                      ))}
                                                            </div>
                                                  </Fade>
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
                                                                                          <span className="select-none text-center">No {filterToDoS === "all" ? "" : filterToDoS === "completed" ? filterToDoS : filterToDoS === "pending" ? filterToDoS : filterToDoS} todo in your list</span>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        )}
                              </div>
                    </section>
          )
}
