import { createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/Pages/Login/RequireAuth/RequireAuth";
import Profile from "./components/Pages/Profile/Profile";
import Navbar from "./components/Pages/Shared/Navbar/Navbar";
import Home from "./components/Pages/Home/Home/Home";
import Login from "./components/Pages/Login/Login/Login";
import ManageToDo from "./components/Pages/ManageToDo/ManageToDo";
import CompletedToDo from "./components/Pages/CompletedToDo/CompletedToDo";
import Dashboard from "./components/Pages/Dashboard/Dashboard/Dashboard";
import Welcome from "./components/Pages/Dashboard/Welcome/Welcome";
import ManageToDoS from "./components/Pages/Dashboard/ManageToDoS/ManageToDoS";
import ManageUsers from "./components/Pages/Dashboard/ManageUsers/ManageUsers";
import RequireAdmin from "./components/Pages/Login/RequireAdmin/RequireAdmin";
import NotFound from "./components/Pages/Shared/NotFound/NotFound";
import AboutMe from "./components/Pages/AboutMe/AboutMe";
export const InitializeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  useEffect(() => {
    setTheme(JSON.parse(window.localStorage.getItem("theme")));
  }, []);

  const handleThemeChange = () => {
    setTheme(!theme);
    window.localStorage.setItem("theme", !theme);
  };

  return (
    <InitializeContext.Provider value={{ handleThemeChange, theme }}>
      <div data-theme={theme && "night"} className="bg-base-100">
        {loading ? (
          <div className="h-screen">
            <div className="dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              <defs>
                <filter id="goo">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="12"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                    result="goo"
                  />
                  <feBlend in="SourceGraphic" in2="goo" />
                </filter>
              </defs>
            </svg>
          </div>
        ) : (
          <Navbar />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutMe" element={<AboutMe />} />
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
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </InitializeContext.Provider>
  );
}

export default App;
