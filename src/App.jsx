import "./App.css";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/Pages/Login/RequireAuth/RequireAuth";
import Profile from "./components/Pages/Profile/Profile";
import Navbar from "./components/Pages/Shared/Navbar/Navbar";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login/Login";
import ManageTask from "./components/Pages/ManageTask/ManageTask";

function App() {
  const [theme, setTheme] = useState(false);
  useEffect(() => {
    setTheme(JSON.parse(window.localStorage.getItem("theme")));
  }, []);
  const handleThemeChange = () => {
    setTheme(!theme);
    window.localStorage.setItem("theme", !theme);
  };
  return (
    <div data-theme={theme && "night"} className="bg-base-100">
      <Navbar handleThemeChange={handleThemeChange} theme={theme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/task"
          element={
            <RequireAuth>
              <ManageTask />
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
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
