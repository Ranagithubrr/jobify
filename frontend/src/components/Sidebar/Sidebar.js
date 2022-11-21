import React from 'react';
import './sidebar.css';
import Logo from '../../assets/images/logo.svg';
import {Link} from 'react-router-dom';
import {ImStatsBars,ImProfile} from 'react-icons/im';
import {MdQueryStats} from 'react-icons/md';
import {RiProfileLine} from 'react-icons/ri';
import {AiFillStar} from 'react-icons/ai';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <img src={Logo} alt="logo here" className='sidebarLogo'/>
      <div className="sidebarMenu">

        <ul>
            <li> <Link to="/"> <span className="navicons"><ImStatsBars /></span> All Users</Link> </li>
            <li> <Link to="/all-posts"><span className="navicons"><MdQueryStats /></span> All Posts</Link> </li>
            <li> <Link to="/my-posts"><span className="navicons"><RiProfileLine /></span> My Posts</Link> </li>
            <li> <Link to="/add-posts"><span className="navicons"><RiProfileLine /></span> Add Posts</Link> </li>
            <li> <Link to="/profile"><span className="navicons"><ImProfile /></span> Profile</Link> </li>
            <li> <Link to="/rate"><span className="navicons"><AiFillStar /></span> Ratings</Link> </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
