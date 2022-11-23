import React, { useEffect, useState } from 'react';
import UserProfile from '../../../assets/images/download.jfif';
import './HomePage.css';
import { IoMdMail, IoIosCall } from 'react-icons/io';
import { ImLocation } from 'react-icons/im';
import { TbWorld } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [user, setUser] = useState([]);
  // const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('/api/v1/jobs/all-users')
      .then(response => response.json())
      // .then(data => { setUser(data.user)});
      .then(data => {
        setUser(data.user)
        // setLoading(false)
      });
      // eslint-disable-next-line
  }, [])
  return (
    <div className='row'>
      {
        user.map((e) => {
          return (
            <div className="col-12 col-lg-3 mt-3 homePageUserProfileArea" key={e._id}>
              <Link to={`user/${e._id}`}>

                <div className="homePageUserProfile">
                  <div className="homePageUserProfileTop">
                    {
                      e.photo !== "" ? <img src={e.photo} alt="" /> : <img src={UserProfile} alt="" />
                    }

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
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default Homepage
