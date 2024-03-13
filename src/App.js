import React, { useState, useEffect } from "react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// CSS
import './css/style.css'
// Pages
import Home from "./components/pages/Home";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";

// Layouts
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import LayoutStudent from "./components/layouts/LayoutStudent";
import LayoutTeacher from "./components/layouts/LayoutTeacher";


import { Routes, Route } from 'react-router-dom'

// pages admin
import ManageAdmin from "./components/pages/admin/ManageAdmin";
import AddTeacher from "./components/pages/admin/AddTeacher";
import AddUser from "./components/pages/admin/AddUser";
// pages Teacher
import Account from "./components/pages/teacher/Account";
import DashBoard from "./components/pages/teacher/DashBoard";


// page user
import HomeUser from './components/pages/user/Home'
import AccountUser from './components/pages/user/Account'
import UploadDataForm from "./components/pages/user/UploadDataForm";
import History from "./components/pages/user/History";

//functions
import { currentUser } from "./components/functions/auth";

// redux
import { useDispatch } from 'react-redux'

// Routes
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import TeacherRoute from "./components/routes/TeacherRoute";











function App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token
  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        //code

        dispatch({
          type: 'LOGIN',
          payload: {
            token: idtoken,
            id: res.data._id,
            studentID: res.data.studentID,
            role: res.data.role,
            email: res.data.email,
            phone: res.data.phone,
            prefix: res.data.prefix,
            firstname: res.data.firstname,
            lastname: res.data.lastname,
            group: res.data.group,

          }
        });
      })
      .catch((err) => {
        console.log(err)
      })
  }



  return (
    <div className="App">
      <ToastContainer autoClose={3000} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/google" element={<UploadDataForm />} />





        <Route path="/admin/mangeadmin" element={
          <AdminRoute>
            <LayoutAdmin>
              <ManageAdmin />
            </LayoutAdmin>
          </AdminRoute>
        } />

        <Route path="/admin/adduser" element={
          <AdminRoute>
            <LayoutAdmin>
              <AddUser />
            </LayoutAdmin>
          </AdminRoute>
        } />






        <Route path="/teacher/dashboard" element={
          <TeacherRoute>
            <LayoutTeacher>
              <DashBoard />
            </LayoutTeacher>
          </TeacherRoute>}
        />
        <Route path="/teacher/account" element={
          <TeacherRoute>
            <LayoutTeacher>
              <Account />
            </LayoutTeacher>
          </TeacherRoute>}
        />

        <Route path="/user/leavepage" element={
          <UserRoute>
            <LayoutStudent>
              <HomeUser />
            </LayoutStudent>
          </UserRoute>}
        />
        <Route path="/user/history" element={
          <UserRoute>
            <LayoutStudent>
              <History />
            </LayoutStudent>
          </UserRoute>}
        />

        <Route path="/user/account" element={
          <UserRoute>
            <LayoutStudent>
              <AccountUser />
            </LayoutStudent>
          </UserRoute>}
        />


      </Routes>
    </div >
  );
}

export default App;
