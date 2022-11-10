import React, { useEffect, useState } from 'react';
import UserProfile from '../../assets/images/download.jfif';
import ProfileBackgrouund from '../../assets/images/profileBackground.webp';
import './HomePage.css';
import { IoMdMail, IoIosCall, IoLocation } from 'react-icons/io';
import { ImLocation } from 'react-icons/im';
import { TbWorld } from 'react-icons/tb';

const Homepage = () => {
  const [user, setUser] = useState([])
  useEffect(() => {
    fetch('/api/v1/jobs/all-users')
      .then(response => response.json())
      .then(data => setUser(data.user));
  },[])
  console.log(user.length);
  // const {name,lastname,email,location,title} = user[0];
  // console.log(user.name);
  return (
    <div className='row'>
      {
        user.map((e) => {
          return (
            <div className="col-3 mt-3">
              <div className="homePageUserProfile">
                <div className="homePageUserProfileTop">
                  <img src={UserProfile} alt="" />
                </div>
                <div className="homePageUserProfileBottom pt-5 mt-4">
                  <h4 className='userProfileName'>{e.name} {e.lastname}</h4>
                  <h6 className='profiletitle'>{e.title}</h6>
                  <div className="homePageUserProfileBottomBottom">
                    <ul>
                      {e.email ? <li><span className="icon"><IoMdMail /></span>{e.email}</li> : null}
                      {e.phone ? <li><span className="icon"><IoIosCall /></span>0{e.phone}</li> : null}
                      {e.website ? <li><span className="icon"><TbWorld /></span>{e.website}</li> : null}
                      {e.location ? <li><span className="icon"><ImLocation /></span>{e.location}</li> : null}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Homepage
