import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import todo from "../../../assets/todo.png";
import { BsGrid } from "react-icons/bs";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import useAdmin from "../../../hooks/useAdmin";
import useProfileImage from "../../../hooks/useProfileImage";
import auth from "../../Login/Firebase/firebase.init";
import useTitle from "../../../hooks/useTitle";
import { InitializeContext } from "../../../App";
import useScrollToTop from "../../../hooks/useScrollToTop";

const Dashboard = () => {
  useScrollToTop();
  const { theme } = useContext(InitializeContext);
  useTitle("Dashboard");
  const [user, isLoading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const [image] = useProfileImage();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await signOut(auth).then(() => {
      navigate("/");
      toast.success(`Thank you, ${user.displayName} to stay with us!`, {
        autoClose: 3000,
        position: "bottom-left",
      });
    });
  };

  if (isLoading || adminLoading) {
    return <Loader />;
  }

  return (
    <div className="drawer drawer-mobile">
      <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-3 md:p-3">
        <div className="header z-50 sticky top-0 flex justify-between items-center bg-base-300 p-4 rounded">
          <label
            htmlFor="dashboard-sidebar"
            className="btn bg-base-300 text-gray-700 hover:text-white drawer-button lg:hidden "
          >
            <BsGrid className={theme ? "text-2xl" : "text-2xl"} />
          </label>
          <Link
            to="/"
            className="text-xl lg:text-2xl md:text-2xl font-semibold"
          >
            K Task ToDo
          </Link>
          <div className="mr-[-1rem] lg:mr-[-81rem] pt-2 md:mr-[-18rem] flex justify-center items-center">
            {/* <li className="list-none">
              <button
                onClick={handleThemeChange}
                className="rounded-full lg:mx-2 font-bold"
              >
                {theme ? (
                  <i className="bx bx-sun text-2xl text-primary"></i>
                ) : (
                  <i className="bx bx-moon text-2xl text-primary"></i>
                )}
              </button>
            </li> */}
          </div>
          <div className="dropdown dropdown-end">
            <label
              tabIndex="0"
              className="btn btn-ghost btn-circle avatar online"
            >
              <div
                style={{ display: "grid" }}
                className="w-10 h-10  place-items-center rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
              >
                {auth?.currentUser?.photoURL ? (
                  <img
                    src={auth?.currentUser?.photoURL}
                    alt={auth?.currentUser?.displayName}
                  />
                ) : (
                  <img src={image} alt={auth?.currentUser?.displayName} />
                )}
              </div>
            </label>
            <ul
              tabIndex="0"
              className="mt-5 p-2 shadow-xl menu menu-compact dropdown-content bg-base-300 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="py-2">
                  <i className="bx bxs-user"></i> Profile
                </Link>
              </li>
              <li>
                <button onClick={handleLogOut}>
                  <i className="bx bx-log-out"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-300 text-base-content">
          <div className="flex flex-col items-center gap-3 text-2xl p-2 border-b pb-5">
            <Link
              to="/"
              className="logo font-semibold text-center flex items-center flex-col gap-2"
            >
              <img src={todo} alt="" className="w-16" /> K Task ToDo
            </Link>
            <div
              onClick={handleLogOut}
              className="badge badge-outline border-primary hover:bg-primary hover:text-white duration-500 cursor-pointer flex justify-center items-center gap-1 p-4"
            >
              <i className="bx bx-log-out"></i>
              Sign Out
            </div>
          </div>
          <li className="py-2 mt-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-white bg-primary" : ""
              }
              to="/dashboard"
            >
              <i className="bx bxs-dashboard text-xl"></i> Dashboard
            </NavLink>
          </li>
          {admin && (
            <>
              <li className="py-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white bg-primary" : ""
                  }
                  to="/dashboard/manageToDoS"
                >
                  <i className="bx bx-list-ul text-xl"></i> Manage All ToDoS
                </NavLink>
              </li>
              {admin && (
                <li className="py-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-white bg-primary" : ""
                    }
                    to="/dashboard/manageUsers"
                  >
                    <i className="bx bxs-user-detail text-xl"></i> Manage All
                    Users
                  </NavLink>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
