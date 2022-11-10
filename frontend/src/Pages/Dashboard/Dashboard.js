import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import Topbar from '../../components/Navbar/Topbar';
import Sidebar from '../../components/Sidebar/Sidebar';

import './dashboard.css';

const Dashboard = (props) => {
  console.log(props.User.response.name);
  const [sideBarClass, setSideBarClass] = useState('')
  const Toggler = (data) => {
    data === '' ? setSideBarClass('showSideBar') : setSideBarClass('');
  };
  return (
    <div className='dashboard'>
      <div className={`sidebarArea ${sideBarClass}`}>
        <Sidebar />
      </div>
      <div className="mainArea">
        <div><Topbar func={Toggler} User={props.User} IsLoading={props.IsLoading}/></div>
        <div className='mainAreaInner'>
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default Dashboard
