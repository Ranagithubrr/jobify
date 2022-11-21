import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './Pages/Landing/Landing';
import PageNotFound from './Pages/PageNotfound/PageNotfound';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.js';
import Dashboard from './Pages/Dashboard/Dashboard';
import { useEffect, useReducer } from 'react';
import { useState } from 'react';
import UserProfile from './components/UserProfile/UserProfile';
import HomePage from './components/DashboardPages/Homepage/Homepage';
import Profile from './components/DashboardPages/Profile/Profile';
import EditProfile from './components/DashboardPages/EditProfile/EditProfile';
import AddPosts from './components/DashboardPages/AddPosts/AddPosts';
import AllPosts from './components/DashboardPages/AllPosts/AllPosts';
import MyPosts from './components/DashboardPages/MyPosts/MyPosts';
import Ratings from './components/DashboardPages/Ratings/Ratings';

function App() {
  const [user, setUser] = useState({ response: {} });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    LoadUserDataFunc();
  }, []);

  const userid = JSON.parse(localStorage.getItem('userid'));

  const LoadUserDataFunc = async () => {

    try {
      const res = await fetch('/api/v1/jobs/userdata', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userid
        }),
      });
      const response = await res.json();
      if (response) {
        setUser({ ...user, response });
        setLoading(false);
      }
    }
    catch (err) {
      console.log('err');
    }
  };
  console.log(loading);



  return (
    <div className='container-fluid'>
      <Routes>
            {/* nested routes here  */}

            <Route path="/" element={
              <ProtectedRoutes>
                <Dashboard User={user} IsLoading={loading} />
              </ProtectedRoutes>
            }>
              <Route index element={<HomePage />} />
              <Route path="/add-posts" element={<AddPosts User={user}/>} />
              <Route path="/my-posts" element={<MyPosts User={user}/>} />
              <Route path="/all-posts" element={<AllPosts />} />
              <Route path="/profile" element={<Profile  />} />
              <Route path="/rate" element={<Ratings  />} />
              <Route path="/user/:userid" element={<UserProfile />} />
              <Route path="/edit-profile" element={<EditProfile User={user} IsLoading={loading} />} />
            </Route>


            <Route path="/" element={<Dashboard />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />

          </Routes>
    </div>
  );
}

export default App;
