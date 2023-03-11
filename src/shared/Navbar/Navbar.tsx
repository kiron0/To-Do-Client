import React, { useContext } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import logo from "../../assets/todo.png";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { BiLogInCircle } from "react-icons/bi";
import useProfileImage from "../../hooks/useProfileImage";
import auth from "../../auth/Firebase/firebase.init";
import useAdmin from "../../hooks/useAdmin";
import useScrollToTop from "../../hooks/useScrollToTop";
import { InitializeContext } from "../../App";
import Swal from "sweetalert2";

const Navbar = () => {
  useScrollToTop();
  const { appName, theme } = useContext(InitializeContext);
  const [user] = useAuthState(auth);
  const [image] = useProfileImage(user);
  const { pathname } = useLocation();
  const [admin] = useAdmin(user);

  const handleLogOut = () => {
    // swal for confirmation
    Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out from this account.",
      icon: "warning",
      showCancelButton: true,
      background: theme === "night" ? "#333" : "#fff",
      color: theme === "night" ? "#fff" : "#333",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        // sign out from firebase
        signOut(auth).then(() => {
          localStorage.removeItem("accessToken");
          toast.success(`Thank you, ${user?.displayName} to stay with us!`, {
            position: "top-center",
          });
        }).catch((err) => {
          // toast for error
          toast(err.message, {
            icon: '👎',
          })
        })
      }
    })
  };

  const NavbarMenus = (
    <>
      <li className="py-1 lg:py-0">
        <NavLink className="text-white uppercase bg-primary" to="/dev">
          Developer
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 w-full z-50 bg-base-100">
      <div
        className="drawer-content flex flex-col backdrop-blur-[18px] bg-base-100 shadow-md"
        style={
          pathname.includes("dashboard")
            ? { display: "none" }
            : { display: "flex" }
        }
      >
        <div className="navbar py-3 container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <HiOutlineMenuAlt4 className="text-3xl text-primary" />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-4 p-2 shadow-xl bg-base-200 rounded-box w-[23.5rem] flex flex-wrap justify-center items-center"
              >
                {
                  user && (
                    <li className="py-1 lg:py-0">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-white uppercase bg-primary" : "uppercase"
                        }
                        to="/toDoS"
                      >
                        ToDo List
                      </NavLink>
                    </li>
                  )
                }
                {NavbarMenus}
              </ul>
            </div>
            <Link
              className="btn btn-ghost normal-case text-xl flex gap-2 items-center"
              to="/"
            >
              <img
                src={logo}
                alt=""
                className={`w-8 h-8 md:w-12 md:h-12 ${!user && "ml-[-1rem]"}`}
              />
              {!user ? (
                <span className="text-xl lg:text-2xl">{appName}</span>
              ) : (
                <span className="text-xl lg:text-2xl flex justify-center items-center">
                  {appName}
                </span>
              )}
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0 gap-3">
              {
                user && (
                  <li className="py-1 lg:py-0">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-white uppercase bg-primary" : "uppercase"
                      }
                      to="/toDoS"
                    >
                      ToDo List
                    </NavLink>
                  </li>
                )
              }
              {NavbarMenus}
            </ul>
          </div>
          <div className="navbar-end gap-3">
            {!user && (
              <NavLink
                to="/getStarted"
                className="btn btn-sm md:btn-md flex gap-2 items-center btn-primary text-white"
              >
                <BiLogInCircle /> <span className="hidden md:block">Get Started</span>
              </NavLink>
            )}
            {user && (
              <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div
                      style={{ display: "grid" }}
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border bg-base-300 grid place-items-center ring ring-primary ring-offset-base-100 ring-offset-2"
                    >
                      {auth?.currentUser?.photoURL ? (
                        <img
                          src={auth?.currentUser?.photoURL}
                          alt={auth?.currentUser?.displayName?.slice(0, 1)}
                        />
                      ) : (
                        <img
                          src={image as string}
                          alt={auth?.currentUser?.displayName?.slice(0, 2)}
                        />
                      )}
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-4 p-2 shadow-xl menu menu-compact dropdown-content bg-base-100 rounded-box w-72"
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto my-4 border ring ring-primary ring-offset-base-100 ring-offset-2">
                      {auth?.currentUser?.photoURL ? (
                        <img
                          src={auth?.currentUser?.photoURL}
                          alt="profile"
                          className="w-full h-full rounded-full"
                        />
                      ) : (
                        <img
                          src={image as string}
                          alt="profile"
                          className="w-full h-full rounded-full"
                        />
                      )}
                    </div>
                    <div className="text-center mb-4">
                      <h2 className="font-semibold text-lg">
                        {auth?.currentUser?.displayName}
                      </h2>

                      <p className="text-xs">
                        User ID: <span className="font-semibold">USER-{auth?.currentUser?.uid?.slice(0, 6)}</span>
                      </p>

                      <Link to="/dashboard/profile">
                        <button className="btn btn-primary mt-4 rounded-full text-white">
                          View Profile
                        </button>
                      </Link>
                    </div>
                    <hr className="font-semibold" />
                    {admin && (
                      <li className="py-1 font-semibold">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "text-white bg-primary" : ""
                          }
                          to="/manageToDoS"
                        >
                          <i className="bx bx-pen font-semibold"></i> All ToDos
                        </NavLink>
                      </li>
                    )}
                    <li className="py-1 font-semibold">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-white bg-primary" : ""
                        }
                        to="/dashboard"
                      >
                        <i className="bx bxs-dashboard"></i> Dashboard
                      </NavLink>
                    </li>
                    <li className="py-1 font-semibold">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-white bg-primary" : ""
                        }
                        to="/dashboard/yourToDos"
                      >
                        <i className="bx bx-pen font-semibold"></i> Your ToDos
                      </NavLink>
                    </li>
                    <li className="py-1">
                      <button
                        onClick={handleLogOut}
                        className="font-semibold"
                      >
                        <i className="bx bx-log-out font-semibold"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
