import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ViewPost.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiDeleteBin5Line } from 'react-icons/ri';

const ViewPost = () => {
  const navigate = useNavigate();
  const { postid } = useParams();
  const userid = JSON.parse(localStorage.getItem('userid'));

  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const [deletee, setDeletee] = useState(false);
  useEffect(() => {
    LoadPostDataFunc();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    LoadPostDataFunc();
    // eslint-disable-next-line
}, [deletee]);


  const LoadPostDataFunc = async () => {
    try {
      const res = await fetch('/api/v1/jobs/post', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          postid
        }),
      });
      const response = await res.json();
      if (response) {
        setPost({ ...post, response });
        setLoading(false);
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  const GetPostDate = (date) => {
    var mongooseDate = new Date(date);  // dateStr you get from mongodb

    var d = mongooseDate.getDate();
    var m = mongooseDate.getMonth() + 1;
    var y = mongooseDate.getFullYear();
    let finalDate = `${d}-${m}-${y}`;
    return finalDate;
  }
  const DeletePostButtonClicked = async (e) => {
    deletee ? setDeletee(false) : setDeletee(true)
    let postid = e.currentTarget.id;
    try {
      const res = await fetch('/api/v1/jobs/delete-post', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          postid
        }),
      });
      const response = await res.json();
      if (response) {

        toast.error('Post Deleted', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate('/my-posts');
      }, 1000)
      }
    }
    catch (err) {
      console.log('err');
    }
  }

  return (
    !loading &&
    <div className='viewPostArea'>
      <ToastContainer />
      <div className="viewPostAreaTop row">
        <div className="viewPostAreaTopPostImg col-6 col-lg-1">
          <img src={post.response.photo} alt="demophoto" className='img-fluid viewPostAreasImg' />
        </div>
        <div className="viewPostAreaPostedBy col-6 col-lg-2">
          <h6>{post.response.name} {post.response.lastname}</h6>
          <span>{GetPostDate(post.response.postdate)}</span>
        </div>
        
        <div className="viewPostAreaPostname col-10 col-lg-8 mt-3 mt-lg-0">
          <h3>{post.response.posttitle}</h3>
        </div>
        <div className="col-2 col-lg-1 deletePostButtonArea">
          {
            post.response.userid === userid ? <abbr title="Delete this Post"><span className='PostdeleteIcon' id={post.response._id} onClick={DeletePostButtonClicked}><RiDeleteBin5Line /></span></abbr> : null
          }
        </div>
      </div>
      <div className="viewPostAreaBottom mt-3">
        <p>{post.response.postbody}</p>
      </div>
    </div>
  )
}

export default ViewPost
