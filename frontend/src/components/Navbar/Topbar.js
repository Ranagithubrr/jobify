import React, { useState } from 'react'
import './topbar.css';
import { RiBarChartHorizontalFill } from 'react-icons/ri';
import { HiUserCircle } from 'react-icons/hi';
import { MdArrowDropDown } from 'react-icons/md';

const Topbar = (props) => {
  const displayName = props.User.response.name;
  const displayLastName = props.User.response.lastname;
  console.log(displayName);
  const [btnToggle, setbtntoggle] = useState('');
  const [sidebarToggle, setSideBarToggle] = useState('');
  const ButtonClicked = () => {
    btnToggle === '' ? setbtntoggle('showLogOutBtn') : setbtntoggle('');

  }
  const BarIconClicked = () => {
    sidebarToggle === '' ? setSideBarToggle('showSideBar') : setSideBarToggle('');
    props.func(sidebarToggle);
  }
  const LogOutUser = () =>{
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
          <button className='userButton' onClick={ButtonClicked}><HiUserCircle /><span>{displayLastName ? displayLastName : displayName}</span> <MdArrowDropDown /> </button>
          {
            btnToggle === 'showLogOutBtn' ? <button className="logOutButton" onClick={LogOutUser}>Log Out</button> : null
          }
        </div>
      </div>
    </>
  )
}

export default Topbar
