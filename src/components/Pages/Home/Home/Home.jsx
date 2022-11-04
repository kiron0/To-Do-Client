import React from "react";
import todo from "../../../Assets/todo.png";
import { NavLink } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";
import Footer from "../Footer/Footer";
import useTitle from "../../../../hooks/useTitle";
import useScrollToTop from "../../../../hooks/useScrollToTop";

const Home = () => {
  useScrollToTop();
  useTitle("Home");
  return (
    <>
      <div className="bg-base-100">
        <section className="body-font bg-base-100">
          <div className="container mx-auto flex px-5 py-6 md:py-20 items-center justify-center flex-col">
            <img
              className="lg:w-2/6 md:w-4/6 w-full mb-10 object-cover object-center rounded-2xl"
              alt="todo"
              src={todo}
            />
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                K Task To Do
              </h1>
              <p className="mb-8">
                K Task ToDo List App is a kind of app that generally used to
                maintain our day-to-day tasks or list everything that we have to
                do, with the most important tasks at the top of the list, and
                the least important tasks at the bottom. It is helpful in
                planning our daily schedules.
              </p>
              <div className="flex justify-center">
                <NavLink to="/toDoS" className="btn btn-primary text-white">
                  <MdAddCircleOutline className="mr-1 text-xl" /> Add Your ToDo Now
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Home;
