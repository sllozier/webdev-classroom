import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, PageNotFound, Login, Dashboard, Navbar } from "./components";

//import all components here

const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route index path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/:id" element={<Dashboard />} />
      {/* More routes go down here */}
    </Routes>
  );
};

export default Router;
