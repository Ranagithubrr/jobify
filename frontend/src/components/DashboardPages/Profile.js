import './profile.css';
import ProfilePic from '../../assets/images/download.jfif';
import { RiMailAddFill  } from 'react-icons/ri';
import { TbChecks  } from 'react-icons/tb';
import { Link } from 'react-router-dom';
const Profile = (props) => {

  // Loading Current User
  const user = props.User;
  const loading = props.IsLoading;

  // useEffect(() => {
  //   LoadUserDataFunc();
  // }, []);

  // // name: "", email: "", lastname: "", _id: "" 
  // const [user, setUser] = useState({ response: {} });
  // const [loading,setLoading] = useState(true);
  // const userid = JSON.parse(localStorage.getItem('userid'));

  // const LoadUserDataFunc = async () => {

  //   try {

  //     const res = await fetch('/api/v1/jobs/userdata', {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         userid
  //       }),

  //     });
  //     const response = await res.json();
  //     setUser({ ...user, response });
  //     setLoading(false);
  //   }
  //   catch (err) {
  //     console.log('err');
  //   }
  // };


  const {
    name,
    location,
    email,
    lastname,
    _id,
    address,
    bloodgroup,
    about,
    education,
    phone,
    title,
    skills
  } = user.response;

  return (
    <div className='profileArea'>
      <div className="row">
        <div className="col-3 profileAreaLeft py-4">
          <div className="profileImageArea">
            <img src={ProfilePic} alt="profile" className='img-fluid profileImage' />
          </div>

          <div className="usersSkills">
            <ul>
              <li>Skills</li>
               {
                loading ? console.log('loading') : (
                  skills.map((e)=>{
                    return <li key={e.index}> <TbChecks /> {e}</li>
                  })
                )
               }
              
            </ul>
          </div>
          <span className='profileMailBox'><a href={`mailto:${email}`}><RiMailAddFill /></a></span>
        </div>
        <div className="col-9 profileAreaRight">
          <div className="profileAreraRightTop">
            <div className="profileAreraRightTopLeft">
              <h4 className='userName'>{name} {lastname}</h4>
              {
                title === '' ? null : <h6 className='profession'>{title}</h6>
              }
            </div>
            <div className="profileAreraRightTopRight">
              <Link to="/edit-profile" className='editProfileBtn'>Edit Profile</Link>
            </div>
          </div>

          <div className="profileAreraRightBottom">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active navLinkBtn" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">About</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link navLinkBtn" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Timeline</button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="profileSectionAbout">
                  <div className="profileSectionAboutLeft">
                    <span>User ID</span>
                    <span>User Name</span>
                    <span>Email</span>
                    {
                      location === '' ? null : <span>Location</span>
                    }
                    {
                      bloodgroup === '' ? null : <span>Blood</span>
                    }
                    {
                      address === '' ? null : <span>Address</span>
                    }
                    {
                      education === '' ? null : <span>Education</span>
                    }
                    {
                      phone === null ? null : <span>Phone</span>
                    }
                  </div>
                  <div className="profileSectionAboutRight">
                    <span>{_id}</span>
                    <span>{name} {lastname}</span>
                    <span>{email}</span>
                    {
                      location === '' ? null : <span>{location}</span>
                    }
                    {
                      bloodgroup === '' ? null : <span>{bloodgroup}</span>
                    }
                    {
                      address === '' ? null : <span>{address}</span>
                    }
                    {
                      education === '' ? null : <span>{education}</span>
                    }
                    {
                      phone === null ? null : <span>0{phone}</span>
                    }
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <p>Timeline is currently on development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
