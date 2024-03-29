import React from 'react'
import Datepicker from "react-tailwindcss-datepicker";
import { PulseLoader } from "react-spinners";
import moment from 'moment';

type Props = {
          handleUpdateToDoS: (e: React.FormEvent<HTMLFormElement>) => void
          handleTitleField: (e: React.ChangeEvent<HTMLInputElement>) => void
          handleDesField: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
          handleValueChange: (date: any) => void
          dateValue: any
          titleField: string
          descriptionField: string
          isLoading: boolean
          modalToDo: any
}

export default function UpdateTodo({ handleUpdateToDoS, handleTitleField, handleDesField, titleField, descriptionField, isLoading, modalToDo, dateValue, handleValueChange }: Props) {

          return (
                    <div>
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
                                                            </div>

                                                            <div className="name border rounded p-3 relative mt-10">
                                                                      <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                                                                                <h3 className="text-xs font-poppins">Update Due Date</h3>
                                                                      </div>
                                                                      {modalToDo?.dueDate && <small>Previous Due Date: <span className='text-primary font-semibold'>{moment(modalToDo?.dueDate).format("Do MMMM YYYY")}</span></small>}
                                                                      <div className={`input-group flex items-center my-2 border p-3 rounded-md mt-2`}>
                                                                                <div className="icon">
                                                                                          <i className="bx bx-calendar"></i>
                                                                                </div>
                                                                                <Datepicker
                                                                                          classNames={{
                                                                                                    input() {
                                                                                                              return `outline-none w-full focus:outline-none pl-4 bg-base-100`
                                                                                                    },
                                                                                                    container() {
                                                                                                              return `bg-base-100`
                                                                                                    }
                                                                                          }}
                                                                                          primaryColor={"emerald"}
                                                                                          displayFormat='DD-MM-YYYY'
                                                                                          placeholder={"Pick Due Date"}
                                                                                          value={dateValue || modalToDo?.dueDate}
                                                                                          minDate={new Date(modalToDo?.dueDate)}
                                                                                          useRange={false}
                                                                                          asSingle={true}
                                                                                          onChange={handleValueChange}
                                                                                />
                                                                      </div>
                                                            </div>

                                                            <div className="modal-action">
                                                                      <label htmlFor="updateModal" className="btn btn-warning text-white">
                                                                                <i className="bx bx-x text-xl"></i> Cancel
                                                                      </label>

                                                                      {isLoading ? (
                                                                                <button className="btn btn-primary" type="button">
                                                                                          <PulseLoader size={8} color="#fff" />
                                                                                </button>
                                                                      ) : (
                                                                                <button className={`btn btn-success text-white`} type="submit">
                                                                                          <i className="bx bx-pen text-lg"></i> Update ToDo
                                                                                </button>
                                                                      )}
                                                            </div>
                                                  </form>
                                        </div>
                              </div>
                    </div>
          )
}
