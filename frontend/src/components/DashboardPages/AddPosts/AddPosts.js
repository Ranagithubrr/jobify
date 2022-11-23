import React, { useEffect } from 'react';
import { useState } from 'react';
import './AddPosts.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPosts = () => {
  const userid = JSON.parse(localStorage.getItem('userid'));

  const [user, setUser] = useState({ response: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    LoadUserDataFunc();
    // eslint-disable-next-line
  }, []);
  // load user photo only
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
  // console.log(loading);

  const [post, setPost] = useState({
    posttitle: "",
    postbody: ""
  });

  // console.log(user.response.photo);



  const InputChanged = (e) => {
    let name, value;
    // console.log(e.target.name, e.target.value);
    name = e.target.name;
    value = e.target.value;
    setPost({ ...post, [name]: value });
  }

  const PostSubmitted = async (e) => {
    e.preventDefault();
    const { posttitle, postbody } = post;
    console.log(post);
    if (posttitle === "" || postbody === "") {
      toast.error('Fill all the fields', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else {
      const res = await fetch('/api/v1/jobs/add-posts', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          posttitle, postbody, userid, name: user.response.name, lastname: user.response.lastname, photo: user.response.photo
        })
      });
      if (res.status === 201) {
        toast.success('Post Created Successfully', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error('Failed to Post', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    }
    setPost({
      posttitle: "",
      postbody: ""
    })
  }

  
  return (
    <div className='addPostArea'>
      <ToastContainer />
      <h3 className='pb-2'>Add Posts</h3>
      <form onSubmit={PostSubmitted}>
        <div className="AddPostformArea">

          <input type="text" placeholder='Post Title' value={post.posttitle} name="posttitle" onChange={InputChanged} className='addPostTitle' />
          <textarea className='mt-2' name="postbody" value={post.postbody} id="addpost" cols="30" rows="10" onChange={InputChanged} placeholder='Write Post Here . . . '></textarea>
          <button type="submit" className='defaultBtn' >POST</button>
          <button type="reset" className='resetBtn' onClick={() => setPost({
            posttitle: "",
            postbody: ""
          })}>Reset</button>
        </div>
      </form>
    </div>
  )
}

export default AddPosts
