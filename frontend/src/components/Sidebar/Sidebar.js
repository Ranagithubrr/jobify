import React from 'react';
import './sidebar.css';
import Logo from '../../assets/images/logo.svg';
import {Link} from 'react-router-dom';
import {ImStatsBars,ImProfile} from 'react-icons/im';
import {MdQueryStats} from 'react-icons/md';
import {RiProfileLine} from 'react-icons/ri';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <img src={Logo} alt="logo here" className='sidebarLogo'/>
      <div className="sidebarMenu">

        <ul>
            <li> <Link to="/"> <span className="navicons"><ImStatsBars /></span> All Users</Link> </li>
            <li> <Link to="/all-jobs"><span className="navicons"><MdQueryStats /></span> All jobs</Link> </li>
            <li> <Link to="/add-jobs"><span className="navicons"><RiProfileLine /></span> Add jobs</Link> </li>
            <li> <Link to="/profile"><span className="navicons"><ImProfile /></span> Profile</Link> </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
