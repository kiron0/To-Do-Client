import React, { useContext } from "react";
import not_found from "../../assets/404.png";
import { InitializeContext } from "../../App";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const { theme } = useContext(InitializeContext);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-base-100">
      <img src={not_found} alt="" />
      <button onClick={() => navigate("/")} className={`btn btn-sm glass ${theme === "night" ? "text-white" : "text-black"}`}>Go Back To Home</button>
    </div>
  );
};

export default NotFound;
