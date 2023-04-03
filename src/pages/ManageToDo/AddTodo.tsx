import React from 'react'
import { PulseLoader } from 'react-spinners'

type Props = {
          handleToCreateToDoS: (e: React.FormEvent<HTMLFormElement>) => void
          isLoading: boolean
}

export default function AddTodo({ handleToCreateToDoS, isLoading }: Props) {
          return (
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
                                                  </div>

                                                  <div className="modal-action">
                                                            <label htmlFor="toDosModal" className="btn btn-warning text-white">
                                                                      <i className="bx bx-x text-xl"></i> Cancel
                                                            </label>

                                                            {isLoading ? (
                                                                      <button className="btn btn-primary" type="button">
                                                                                <PulseLoader size={8} color="#fff" />
                                                                      </button>
                                                            ) : (
                                                                      <button className={`btn btn-success text-white`} type="submit">
                                                                                <i className="bx bxs-pen text-lg"></i> Add ToDo
                                                                      </button>
                                                            )}
                                                  </div>
                                        </div>
                              </div>
                    </form>
          )
}
