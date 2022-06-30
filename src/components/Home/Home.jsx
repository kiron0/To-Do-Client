import React from "react";
import todo from "../../Assets/todo.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-base-100 h-[80vh]">
      <section class="body-font bg-base-100">
        <div class="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
          <img
            class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded-2xl"
            alt="hero"
            src={todo}
          />
          <div class="text-center lg:w-2/3 w-full">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              K Task ToDo Web App
            </h1>
            <p class="mb-8 leading-relaxed font-semibold">
              ToDo List App is a kind of app that generally used to maintain our
              day-to-day tasks or list everything that we have to do, with the
              most important tasks at the top of the list, and the least
              important tasks at the bottom. It is helpful in planning our daily
              schedules.
            </p>
            <div class="flex justify-center">
              <Link to="/task">
                <button class="inline-flex text-white border-0 py-3 lg:py-4 px-6 focus:outline-none rounded text-lg btn-primary">
                  Add Your First ToDo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
