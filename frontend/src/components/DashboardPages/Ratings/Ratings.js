import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import './Ratings.css';
import profile from '../../../assets/images/download.jfif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'

const Ratings = () => {

    const [allReview, setAllReview] = useState([]);
    const [deletee, setDeletee] = useState(false);
    

    useEffect(() => {
        getAllReview();
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        getAllReview();
        // eslint-disable-next-line
    }, [deletee]);
    const getAllReview = async () => {
        fetch('/api/v1/jobs/all-review')
            .then(response => response.json())
            .then(data => setAllReview(data.allreview));
    }

    const [user, setUser] = useState({ response: {} });
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        LoadUserDataFunc();
        // eslint-disable-next-line
    }, []);

    const userid = JSON.parse(localStorage.getItem('userid'));
    // load user data
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


    const [ratings, setRatings] = useState(5);
    const [review, setReview] = useState('');
    let name = user.response.name;
    let lastname = user.response.lastname;
    let photo = user.response.photo;

    const ButtonClicked = async () => {
        if (review === "") {
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
            const res = await fetch('/api/v1/jobs/review', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userid, photo, name, lastname, ratings, review
                })
            });
            if (res.status === 201) {
                toast.success('Review Posted Successfully', {
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
            else {
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
        };
        setRatings(5);
        setReview('');
        getAllReview();
    }


    const deleteReview = async (e) =>{
        deletee ? setDeletee(false) : setDeletee(true)
        let reviewid = e.currentTarget.id;
        try {
            const res = await fetch('/api/v1/jobs/delete-review', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    reviewid
                }),
            });
            const response = await res.json();
            if (response) {
                toast.error('Review Deleted', {
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
        <div className='ratingArea'>
            <ToastContainer />
            <div className="makeRating">
                <h3>Rate this app</h3>
                <Rating
                    className='fiveStar'
                    name="simple-controlled"
                    value={ratings}
                    onChange={(event, newval) => {
                        setRatings(newval)
                    }}
                />
                <textarea name="review" id="reviewbox" rows="5" placeholder='Write somethig about this app' value={review} onChange={(e) => { setReview(e.target.value) }} />
                <button onClick={ButtonClicked} className='defaultBtn mt-3'>Post Review</button>
            </div>
            {
                allReview.slice(0).reverse().map((ele) => {
                    return (
                        <div className="showRatings mt-4" key={ele._id}>
                            <div className="ratingAreaMain" >
                                <div className="ratingAreatop">
                                    <div className="ratingAreatopLeft">
                                        <img src={ele.photo} alt="profile" className='raterImage img-fluid' />
                                    </div>
                                    <div className="ratingAreatopRight">
                                        <div><Rating name="read-only" value={ele.ratings} readOnly /></div>
                                        <div><h6>{ele.name} {ele.lastname}</h6></div>
                                    </div>
                                    {
                                    userid === ele.userid ? <abbr title="Delete this Review"><span className='deleteReview' onClick={deleteReview} id={ele._id}><AiFillDelete /></span> </abbr> : null 
                                    }
                                </div>
                                <div className="ratingAreaBottom">
                                    <p> <sup><FaQuoteLeft className='quoteIcon' /></sup>  {ele.review} <sub> <FaQuoteRight className='quoteIcon' /></sub></p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Ratings
