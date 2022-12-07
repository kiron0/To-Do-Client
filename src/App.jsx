import { createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth/RequireAuth";
import Profile from "./pages/Profile/Profile";
import Navbar from "./shared/Navbar/Navbar";
import Home from "./pages/Home/Home/Home";
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
export const InitializeContext = createContext(null);

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
    setTheme(window.localStorage.getItem("theme"));
  }, []);

  const { data, refetch } = useQuery("appName", async () => {
    const res = await axios.get(`${BASE_API}/app/appName`);
    return res?.data;
  });

  const appName = data?.appName;

  return (
    <InitializeContext.Provider value={{ theme, setTheme, appName }}>
      <div data-theme={theme ? theme : "light"} className="bg-base-100">
        {loading ? <LoadingScreen /> : <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/developer" element={<AboutMe />} />
          <Route
            path="/toDoS"
            element={
              <RequireAuth>
                <ManageToDo />
              </RequireAuth>
            }
          />
          <Route
            path="/completed"
            element={
              <RequireAuth>
                <CompletedToDo />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="dashboard"
            element={
              <RequireAdmin>
                <Dashboard />
              </RequireAdmin>
            }
          >
            <Route index element={<Welcome />} />
            <Route path="manageToDoS" element={<ManageToDoS />} />
            <Route path="manageUsers" element={<ManageUsers />} />
            <Route
              path="setting"
              element={
                <RequireAdmin>
                  <Setting appChangeRefetch={refetch} />
                </RequireAdmin>
              }
            ></Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        {loading ? null : <ThemeChanger />}
      </div>
    </InitializeContext.Provider>
  );
}

export default App;
