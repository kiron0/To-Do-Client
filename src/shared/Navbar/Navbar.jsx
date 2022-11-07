import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import logo from "../../assets/todo.png";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { BiLogInCircle } from "react-icons/bi";
import useProfileImage from "../../hooks/useProfileImage";
import auth from "../../pages/Login/Firebase/firebase.init";
import useAdmin from "../../hooks/useAdmin";
import { InitializeContext } from "../../App";
import useScrollToTop from "../../hooks/useScrollToTop";

const Navbar = () => {
  useScrollToTop();
  const { handleThemeChange, theme } = useContext(InitializeContext);
  const [user] = useAuthState(auth);
  const [image] = useProfileImage(user);
  const { pathname } = useLocation();
  const [admin] = useAdmin(user);
  const [scrollY, setScrollY] = useState();

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollY(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY, user]);

  const handleLogOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    toast.success(`Thank you, ${user.displayName} to stay with us!`, {
      position: "top-center",
      autoClose: 5000,
    });
  };

  const NavbarMenus = (
    <>
      <li className="py-1 lg:py-0">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white uppercase bg-primary" : "uppercase"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
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
      <li className="py-1 lg:py-0">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white uppercase bg-primary" : "uppercase"
          }
          to="/aboutMe"
        >
          About Me
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 w-full z-50 bg-base-100">
      <div
        className={`drawer-content flex flex-col backdrop-blur-[18px] bg-base-100 duration-500 ${
          scrollY > 60 && "shadow-xl"
        }`}
        style={
          pathname.includes("dashboard")
            ? { display: "none" }
            : { display: "flex" }
        }
      >
        <div className="navbar py-3 container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex="0" className="btn btn-ghost lg:hidden">
                <HiOutlineMenuAlt4 className="text-3xl" />
              </label>
              <ul
                tabIndex="0"
                className="menu menu-compact dropdown-content mt-4 p-2 shadow-xl bg-base-300 rounded-box w-[23.5rem] flex flex-wrap justify-center items-center"
              >
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
                <span className="text-xl lg:text-2xl">K Task ToDo</span>
              ) : (
                <span className="text-xl lg:text-2xl flex justify-center items-center">
                  K Task ToDo
                </span>
              )}
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0 gap-3">{NavbarMenus}</ul>
          </div>
          <div className="navbar-end gap-3">
            <li className="list-none">
              <button
                onClick={handleThemeChange}
                className="rounded-full lg:mx-2 font-bold ml-2"
              >
                {theme ? (
                  <i className="bx bx-sun text-2xl text-primary"></i>
                ) : (
                  <i className="bx bx-moon text-2xl text-primary"></i>
                )}
              </button>
            </li>
            {!user && (
              <NavLink
                to="/login"
                className="btn flex gap-2 items-center btn-primary text-white"
              >
                <BiLogInCircle /> Login
              </NavLink>
            )}
            {user && (
              <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex="0"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div
                      style={{ display: "grid" }}
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border bg-base-300 grid place-items-center ring ring-primary ring-offset-base-100 ring-offset-2"
                    >
                      {auth?.currentUser?.photoURL ? (
                        <img
                          src={auth?.currentUser?.photoURL}
                          alt={auth?.currentUser?.displayName.slice(0, 1)}
                        />
                      ) : (
                        <img
                          src={image}
                          alt={auth?.currentUser?.displayName.slice(0, 2)}
                        />
                      )}
                    </div>
                  </label>
                  <ul
                    tabIndex="0"
                    className="mt-3 p-2 shadow-xl menu menu-compact dropdown-content bg-base-100 rounded-box w-60"
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
                          src={image}
                          alt="profile"
                          className="w-full h-full rounded-full"
                        />
                      )}
                    </div>
                    <div className="text-center mb-4">
                      <h2 className="font-semibold text-lg">
                        {auth?.currentUser?.displayName}
                      </h2>

                      <Link to="/profile">
                        <button className="btn btn-primary mt-4 rounded-full text-white">
                          View Profile
                        </button>
                      </Link>
                    </div>
                    <hr className="font-semibold" />
                    {admin && (
                      <li className="py-1 font-semibold">
                        <Link
                          className={({ isActive }) =>
                            isActive ? "text-white py-3 bg-primary" : "py-3"
                          }
                          to="/dashboard"
                        >
                          <i className="bx bxs-dashboard"></i> Dashboard
                        </Link>
                      </li>
                    )}
                    <li className="py-1">
                      <button
                        onClick={handleLogOut}
                        className="py-3 font-semibold"
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
