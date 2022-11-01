import React from 'react';
import Notfound from '../../assets/images/404.jpg';
import './PageNotfound.css';
const PageNotFound = () => {
  return (
    <div>
      <img src={Notfound} alt="404 Banner not found" className='notfoundimg'/>
    </div>
  )
}
export default PageNotFound;
