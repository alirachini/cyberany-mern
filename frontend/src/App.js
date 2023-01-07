import { React, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Sidebar from "./components/Sidebar";
import Terms from "./components/Terms";
import Homepage from "./components/Homepage-Body";
import FullBlog from "./components/fullBlog";
import ShowBlogs from "./components/ShowBlogs";
import AddDash from "./components/AddDash";
import EditDash from "./components/EditDash";
import Login from "./components/Login";
import EditContact from "./components/editContact";
import EditAbout from "./components/EditAbout";
import DashComments from "./components/DashComment";
import Approvecomment from "./components/Approvecomment";
import AddCat from "./components/AddCat";
import Catnew from "./components/Catnew";
import EditCat from "./components/EditCat";

import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />

          <Route path="/contact" element={<ContactUs />} />
          <Route path="/blogs/:id" element={<FullBlog />} />
          <Route path="/login/dashboard/view" element={<ShowBlogs />} />
          <Route path="/login/dashboard/add" element={<AddDash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/blog/update/:id" element={<EditDash />} />
          <Route path="/login/dashboard/contact" element={<EditContact />} />
          <Route path="/login/dashboard/about" element={<EditAbout />} />
          <Route path="/login/dashboard/comments" element={<DashComments />} />
          <Route path="/comments/:id" element={<Approvecomment />} />
          <Route path="/login/cat" element={<AddCat />} />
          <Route path="/login/cat/add" element={<Catnew />} />
          <Route path="/login/cat/edit/:id" element={<EditCat />} />
          <Route path="/login/dashboard" element={<Dashboard />} />
          <Route
            path="*"
            element={
              <main
                style={{
                  padding: "1rem",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <p>There's nothing here</p>
              </main>
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
