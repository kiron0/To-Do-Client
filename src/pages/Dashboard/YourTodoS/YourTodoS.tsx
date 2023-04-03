import React from 'react'
import useScrollToTop from '../../../hooks/useScrollToTop';
import useTitle from '../../../hooks/useTitle';
import { useQuery } from 'react-query';
import auth from '../../../auth/Firebase/firebase.init';
import { BASE_API } from '../../../config';
import Loader from '../../../components/Loader/Loader';
import ToDoSTable from './ToDoSTable';

const Fade = require("react-reveal/Fade");

export default function YourTodoS() {
          useScrollToTop();
          useTitle("Manage Your ToDoS");
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


          if (isLoading || !toDosData || !toDosData.length) {
                    return <Loader />;
          }
          return (
                    <section className="lg:px-4 py-7 bg-base-100">
                              <div className="title mb-4 px-4 lg:py-4">
                                        <h3 className="text-2xl font-semibold">Manage Your ToDoS</h3>
                                        <span>You can see all the toDoS which are added by you.</span>
                              </div>
                              <div>
                                        {isLoading ? (
                                                  <Loader />
                                        ) : toDosData?.length > 0 ? (
                                                  <Fade top distance="20px">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto lg:px-4 lg:mt-10">
                                                                      {toDosData?.map((todo: any) => (
                                                                                <ToDoSTable key={todo._id} todo={todo} refetch={refetch} />
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
                                                                                          <span>No completed todo in your list</span>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        )}
                              </div>
                    </section>
          )
}
