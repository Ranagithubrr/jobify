import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './Pages/Landing/Landing'
import PageNotFound from './Pages/PageNotfound/PageNotfound';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.js';
import Dashboard from './Pages/Dashboard/Dashboard';
import AddJob from './components/DashboardPages/AddJob';
import AllJobs from './components/DashboardPages/AllJobs';
import Profile from './components/DashboardPages/Profile';
import States from './components/DashboardPages/States';
import { useEffect } from 'react';
import EditProfile from './components/DashboardPages/EditProfile';
import { useState } from 'react';

function App() {

  useEffect(() => {
    LoadUserDataFunc();
  }, []);

  // name: "", email: "", lastname: "", _id: "" 
  const [user, setUser] = useState({ response: {} });
  const [loading,setLoading] = useState(true);
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
      setUser({ ...user, response });
      setLoading(false);
    }
    catch (err) {
      console.log('err');
    }
  };

  return (
    <div className='container-fluid'>
      <Routes>
        {/* nested routes here  */}

        <Route path="/" element={
          <ProtectedRoutes>
            <Dashboard User={user} IsLoading={loading}/>
          </ProtectedRoutes>
        }>
          <Route index element={<States />} />
          <Route path="/add-jobs" element={<AddJob />} />
          <Route path="/all-jobs" element={<AllJobs />} />
          <Route path="/profile" element={<Profile User={user} IsLoading={loading}/>} />
          <Route path="/edit-profile" element={<EditProfile />} />
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
