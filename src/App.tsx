import React, { createContext, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useQuery } from "react-query";
import { BASE_API } from "./config";
import RequireAuth from "./auth/RequireAuth/RequireAuth";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Authentication/Login/Login";
import ManageToDo from "./pages/ManageToDo/ManageToDo";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import Welcome from "./pages/Dashboard/Welcome/Welcome";
import ManageToDoS from "./pages/Dashboard/ManageToDoS/ManageToDoS";
import ManageUsers from "./pages/Dashboard/ManageUsers/ManageUsers";
import RequireAdmin from "./auth/RequireAdmin/RequireAdmin";
import NotFound from "./shared/NotFound/NotFound";
import AboutMe from "./pages/AboutMe/AboutMe";
import ThemeChanger from "./shared/ThemeChanger/ThemeChanger";
import LoadingScreen from "./shared/LoadingScreen/LoadingScreen";
import Setting from "./pages/Dashboard/Setting/Setting";
import Root from "./Layouts/Root";
import Navbar from "./shared/Navbar/Navbar";
import YourTodoS from "./pages/Dashboard/YourTodoS/YourTodoS";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />
    },
    {
      path: "/getStarted",
      element: <Login />
    },
    {
      path: "/dev",
      element: <AboutMe />
    },
    {
      path: "/toDoS",
      element:
        <RequireAuth>
          <Navbar />
          <ManageToDo />
        </RequireAuth>
    },
    {
      path: "/dashboard",
      element: <RequireAuth>
        <Dashboard />
      </RequireAuth>,
      children: [
        {
          path: "/dashboard",
          element: <Welcome />
        },
        {
          path: "/dashboard/profile",
          element: <Profile />
        },
        {
          path: "/dashboard/manageToDoS",
          element: <ManageToDoS />
        },
        {
          path: "/dashboard/yourToDos",
          element: <YourTodoS />
        },
        {
          path: "/dashboard/manageUsers",
          element: <RequireAdmin>
            <ManageUsers />
          </RequireAdmin>
        },
        {
          path: "/dashboard/setting",
          element: <RequireAdmin>
            <Setting />
          </RequireAdmin>
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]
)

export const InitializeContext = createContext(null as any);

function App() {
  const [theme, setTheme] = useState<string>("emerald");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setTheme(window.localStorage.getItem("todoSTheme") || "emerald");
  }, []);

  const { data, refetch, isLoading } = useQuery("appName", async () => {
    const res = await axios.get(`${BASE_API}/app/appName`);
    return res?.data;
  });

  const appName = data?.result?.appName;

  return (
    <div data-theme={theme ? theme : "light"} className="bg-base-100">
      <InitializeContext.Provider value={{ theme, setTheme, appName, refetch, isLoading }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <RouterProvider router={router} />
            <Toaster />
          </>
        )}
        {loading ? null : <ThemeChanger />}
      </InitializeContext.Provider>
    </div>
  );
}

export default App;
