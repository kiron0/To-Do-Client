import { createContext, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import RequireAuth from "./auth/RequireAuth/RequireAuth";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Authentication/Login/Login";
import ManageToDo from "./pages/ManageToDo/ManageToDo";
import CompletedToDo from "./pages/CompletedToDo/CompletedToDo";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import Welcome from "./pages/Dashboard/Welcome/Welcome";
import ManageToDoS from "./pages/Dashboard/ManageToDoS/ManageToDoS";
import ManageUsers from "./pages/Dashboard/ManageUsers/ManageUsers";
import RequireAdmin from "./auth/RequireAdmin/RequireAdmin";
import NotFound from "./shared/NotFound/NotFound";
import AboutMe from "./pages/AboutMe/AboutMe";
import ThemeChanger from "./shared/ThemeChanger/ThemeChanger";
import LoadingScreen from "./shared/LoadingScreen/LoadingScreen";
import axios from "axios";
import { useQuery } from "react-query";
import { BASE_API } from "./config";
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
      element:
        <>
          <Navbar />
          <AboutMe />
        </>
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
      path: "/completed",
      element: <RequireAuth>
        <Navbar />
        <CompletedToDo />
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
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  useEffect(() => {
    setTheme(window.localStorage.getItem("todoSTheme") || "light");
  }, []);

  const { data, refetch, isLoading } = useQuery("appName", async () => {
    const res = await axios.get(`${BASE_API}/app/appName`);
    return res?.data;
  });

  const appName = data?.appName;

  return (
    <>
      <InitializeContext.Provider value={{ theme, setTheme, appName, refetch, isLoading }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div data-theme={theme ? theme : "light"} className="bg-base-100">
            <RouterProvider router={router} />
            <Toaster />
          </div>
        )}
        {loading ? null : <ThemeChanger />}
      </InitializeContext.Provider>
    </>
  );
}

export default App;
