import moment from 'moment'
import React from 'react'

type Props = {
          modalToDo: any
}

export default function DetailsTodo({ modalToDo }: Props) {
          return (
                    <div>
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
                                                            <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 select-none cursor-not-allowed">
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
                                                            <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 select-none cursor-not-allowed">
                                                                      <div className="icon">
                                                                                <i className="bx bx-detail"></i>
                                                                      </div>
                                                                      <p className="overflow-auto overflow-x-hidden max-h-36 select-none pl-2">
                                                                                {modalToDo?.description}
                                                                      </p>
                                                            </div>
                                                  </div>

                                                  <div className="card-actions justify-end my-4">
                                                            Status -{" "}
                                                            <div
                                                                      className={`badge badge-outline ${modalToDo?.completed ? "badge-success" : "badge-error"
                                                                                }`}
                                                            >
                                                                      {modalToDo?.completed ? "Completed" : "Pending"}
                                                            </div>
                                                  </div>
                                                  <div className="card-actions justify-end">
                                                            Added By -{" "}
                                                            <div
                                                                      className="badge badge-outline badge-primary tooltip tooltip-left tooltip-primary select-none"
                                                                      data-tip={modalToDo?.addedBy?.email}
                                                            >
                                                                      {modalToDo?.addedBy?.name}
                                                            </div>
                                                  </div>
                                                  {
                                                            modalToDo?.dueDate && (
                                                                      <div className="card-actions justify-end mt-3">
                                                                                Due Date -{" "}
                                                                                <div className="badge badge-outline badge-error">
                                                                                          {moment(modalToDo?.dueDate).format("Do MMMM YYYY")}
                                                                                </div>
                                                                      </div>
                                                            )
                                                  }
                                                  <div className="card-actions justify-end mt-3">
                                                            Added at -{" "}
                                                            <div className="badge badge-outline badge-info">
                                                                      {modalToDo?.createdAt}
                                                            </div>
                                                  </div>
                                                  <div className="modal-action">
                                                            <label htmlFor="detailsModal" className="btn btn-warning text-white">
                                                                      <i className="bx bx-x text-xl"></i> Close
                                                            </label>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}
