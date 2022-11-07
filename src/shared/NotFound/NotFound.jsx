import React from "react";
import not_found from "../../assets/404.png";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-base-100">
      <img src={not_found} alt="" />
    </div>
  );
};

export default NotFound;
