import React, { useEffect, useState } from 'react'
import './topbar.css';
import { RiBarChartHorizontalFill } from 'react-icons/ri';
import { HiUserCircle } from 'react-icons/hi';
import { MdArrowDropDown } from 'react-icons/md';

const Topbar = (props) => {
  
  // loading the user 

  const [user, setUser] = useState({ response: {} });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    LoadUserDataFunc();
  }, []);
console.log(user.response.name);
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

  // loaded the user 




  const [btnToggle, setbtntoggle] = useState('');
  const [sidebarToggle, setSideBarToggle] = useState('');
  const ButtonClicked = () => {
    btnToggle === '' ? setbtntoggle('showLogOutBtn') : setbtntoggle('');

  }
  const BarIconClicked = () => {
    sidebarToggle === '' ? setSideBarToggle('showSideBar') : setSideBarToggle('');
    props.func(sidebarToggle);
  }
  const LogOutUser = () => {
    localStorage.removeItem('userid');
    localStorage.removeItem('token');
    window.location.reload();
  }
  const userId = JSON.parse(localStorage.getItem('userid'));
  // console.log(userName);
  return (
    <>
      <div className='topbar'>
        <div><span className='baricon' onClick={BarIconClicked}><RiBarChartHorizontalFill /></span></div>
        <div><span><h2>Dashboard</h2></span></div>
        <div className='userButtonArea'>
          <button className='userButton' onClick={ButtonClicked}><HiUserCircle /><span>{user.response.lastname ? user.response.lastname : user.response.name}</span> <MdArrowDropDown /> </button>
          {
            btnToggle === 'showLogOutBtn' ? <button className="logOutButton" onClick={LogOutUser}>Log Out</button> : null
          }
        </div>
      </div>
    </>
  )
}

export default Topbar
