import React from 'react'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from '../components/navbar/Navbar';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import PrivateRouter from './PrivateRouter'
import Register from '../pages/Register'
import Details from '../pages/Details';
import NewBlog from '../pages/NewBlog';
import Profile from '../pages/Profile';
import UptadePost from '../components/UptadePost';

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>


        <Route path='/' element={<Dashboard />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='posts/:id/:slug' element={<PrivateRouter />}>
          <Route path='' element={<Details />} />
        </Route>
        <Route path='new' element={<PrivateRouter />}>
          <Route path='' element={<NewBlog />} />
        </Route>
        <Route path='profile' element={<PrivateRouter />} >
          <Route path='' element={< Profile />} />
        </Route>
        <Route path='update-post/:p_id' element={<UptadePost />} />
      </Routes>
    </Router>
  )
}

export default AppRouter