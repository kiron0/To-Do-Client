import "./App.css";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/Pages/Login/RequireAuth/RequireAuth";
import Profile from "./components/Pages/Profile/Profile";
import Navbar from "./components/Pages/Shared/Navbar/Navbar";
import Home from "./components/Pages/Home/Home/Home";
import Login from "./components/Pages/Login/Login/Login";
import ManageToDo from "./components/Pages/ManageToDo/ManageToDo";
import CompletedToDo from "./components/Pages/CompletedToDo/CompletedToDo";
import Calendar from "./components/Pages/Calendar/Calendar";
import Dashboard from "./components/Pages/Dashboard/Dashboard/Dashboard";
import Welcome from "./components/Pages/Dashboard/Welcome/Welcome";
import ManageToDoS from "./components/Pages/Dashboard/ManageToDoS/ManageToDoS";
import ManageUsers from "./components/Pages/Dashboard/ManageUsers/ManageUsers";
import RequireAdmin from "./components/Pages/Login/RequireAdmin/RequireAdmin";

function App() {
  const [theme, setTheme] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setTheme(JSON.parse(window.localStorage.getItem("theme")));
  }, []);
  const handleThemeChange = () => {
    setTheme(!theme);
    window.localStorage.setItem("theme", !theme);
  };
  return (
    <div data-theme={theme && "night"} className="App bg-base-100">
      {loading ? (
        <div id="preloader">
          <div id="loader"></div>
        </div>
      ) : (
        <Navbar handleThemeChange={handleThemeChange} theme={theme} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/calendar" element={<Calendar />} />
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
              <Dashboard handleThemeChange={handleThemeChange} theme={theme} />
            </RequireAdmin>
          }
        >
          <Route index element={<Welcome />} />
          <Route path="manageToDoS" element={<ManageToDoS />} />
          <Route path="manageUsers" element={<ManageUsers />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
