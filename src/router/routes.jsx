// import { createBrowserRouter } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import AboutMe from "../pages/AboutMe/AboutMe";
import CompletedToDo from "../pages/CompletedToDo/CompletedToDo";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import ManageToDoS from "../pages/Dashboard/ManageToDoS/ManageToDoS";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import Welcome from "../pages/Dashboard/Welcome/Welcome";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login/Login";
import RequireAdmin from "../pages/Login/RequireAdmin/RequireAdmin";
import RequireAuth from "../pages/Login/RequireAuth/RequireAuth";
import ManageToDo from "../pages/ManageToDo/ManageToDo";
import Profile from "../pages/Profile/Profile";
import NotFound from "../shared/NotFound/NotFound";

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "aboutMe",
        element: <AboutMe />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "toDos",
        element: (
          <RequireAuth>
            <ManageToDo />
          </RequireAuth>
        ),
      },
      {
        path: "completed",
        element: (
          <RequireAuth>
            <CompletedToDo />
          </RequireAuth>
        ),
      },
      {
        path: "/profile",
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <RequireAdmin>
        <Dashboard />
      </RequireAdmin>
    ),
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "manageToDoS",
        element: <ManageToDoS />,
      },
      {
        path: "manageUsers",
        element: <ManageUsers />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
