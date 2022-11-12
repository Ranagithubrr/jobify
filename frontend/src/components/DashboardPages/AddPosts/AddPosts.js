import React, { useEffect } from 'react';
import { useState } from 'react';
import { MdTitle } from 'react-icons/md';
import { RiReservedFill } from 'react-icons/ri';
import './AddPosts.css';

const AddPosts = () => {
  const userid = JSON.parse(localStorage.getItem('userid'))
  const name = JSON.parse(localStorage.getItem('name'))
  const lastname = JSON.parse(localStorage.getItem('lastname'))

  const postedby = name + ' ' + lastname;

  const [post , setPost] = useState({
    posttitle:"",
    postbody:"",
    userid:userid,
    postedby: postedby,
  });





  const InputChanged = (e) => {
      let name, value;
      // console.log(e.target.name, e.target.value);
      name = e.target.name;
      value = e.target.value;
      setPost({ ...post, [name]: value });
  }

  const PostSubmitted = async (e) =>{
    e.preventDefault();
    const {posttitle,postbody,userid,postedby} = post;

    if(posttitle === "" || postbody === ""){
      window.alert('Fill all the fields')
    }else{
      const res = await fetch('/api/v1/jobs/add-posts', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            posttitle, postbody,userid,postedby
        })
    });
    if(res.status === 201){
      window.alert('Post Created Successfully');
    }
    }
  }
  return (
    <div className='addPostArea'>
      <h3 className='pb-2'>Add Posts</h3>
      <form  onSubmit={PostSubmitted}>
        <div className="AddPostformArea">
          <input type="text" placeholder='Post Title' defaultValue={post.posttitle} name="posttitle" onChange={InputChanged}/>
          <textarea className='mt-2' name="postbody" id="addpost" cols="30" rows="10" onChange={InputChanged} placeholder='Write Post Here . . . '></textarea>
          <button type="submit" className='defaultBtn' >POST</button>
          <button type="reset" className='resetBtn' >Reset</button>
        </div>
      </form>
    </div>
  )
}

export default AddPosts
