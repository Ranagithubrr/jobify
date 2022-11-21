import React, { useEffect, useState } from 'react';
import demoPhoto from '../../../assets/images/download.jfif';
import './MyPost.css';
import { RiDeleteBin5Line, RiH2 } from 'react-icons/ri';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyPosts = () => {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletee, setDeletee] = useState(false)

    // const userid = localStorage.getItem('userid')
    useEffect(() => {
        MyPostFunc();
    }, []);
    useEffect(() => {
        MyPostFunc();
    }, [deletee]);

    const userid = JSON.parse(localStorage.getItem('userid'));
    // load user data
    const MyPostFunc = async () => {

        try {
            const res = await fetch('/api/v1/jobs/my-posts', {
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
                setPosts(response);
                setIsLoading(false)
            }
        }
        catch (err) {
            console.log('err');
        }
    };
    console.log(posts);

    const GetPostData = (date) => {
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
            }
        }
        catch (err) {
            console.log('err');
        }
    }
    return (
        <div className='row mypostArea'>
            <ToastContainer />
            {posts.length === 0 ? <h2>No Post Yet</h2> : (

                posts.map((ele) => {
                    return ( 
                        <div className="col-4 mt-3">
                            <div className="myPostAreaPost">
                                <div className="myPostAreaSinglePost">
                                    <div className="row d-flex align-items-center topMyPostArea">
                                        <div className="col-3">
                                            <img src={
                                                    ele.photo !== null ? ele.photo : demoPhoto
                                            } alt="not found" className='img-fluid postProfilePhoto'/>    
                                        </div>
                                        <div className="col-7 px-0">
                                            <abbr title="Delete this Post"><span className='PostdeleteIcon' id={ele._id} onClick={DeletePostButtonClicked}><RiDeleteBin5Line /></span></abbr>
                                            <h5>Author: <span> {ele.name} {ele.lastname} </span></h5>
                                           <h5>Posted at : <span>{GetPostData(ele.postdate)}</span>  </h5> 
                                        </div>
                                    </div>
                                    <div className="row mt-3 postbodyArea">
                                        <h4>{ele.posttitle}</h4>
                                        <p>{ele.postbody}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            )}

        </div>
    )
}

export default MyPosts
