import React from 'react'
import Main from '../../assets/wrappers/Main';
import Logo from '../../assets/images/logo.svg';
import LandingImg from '../../assets/images/main.svg';
import './Landing.css';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Main>
      <div className="navbar">
        <img src={Logo} alt="" />
      </div>
      <div className="landingTwoDiv">
        <div className="landingleft">
            <h1>Job <span>Tracking</span> App</h1>
            <p>I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue bottle single-origin coffee chia. Aesthetic post-ironic venmo, quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch narwhal.</p>
            <Link to="/login"><button className='defaultBtn'>Login/Register</button></Link>
            
        </div>
        <div className="landingright">
        <img src={LandingImg} alt="" className='img-fluid'/>
        </div>
      </div>
    </Main>
  )
}

export default Landing
