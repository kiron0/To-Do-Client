import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar/Navbar';
import useTitle from '../hooks/useTitle';
import Home from '../pages/Home/Home/Home';

export default function Root() {
  useTitle("Home");
  return (
    <>
      <Navbar />
      <Home />
      <Outlet />
    </>
  )
}
