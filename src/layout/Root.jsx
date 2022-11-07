import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";

export default function Root() {
  return (
    <>
      <Navbar />
      <Toaster />
      <Outlet />
    </>
  );
}
