import React, { useEffect, useState } from 'react';
import demoPhoto from '../../../assets/images/download.png';

const AllPosts = () => {

  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    fetch('/api/v1/jobs/all-post')
      .then(response => response.json())
      .then(data => setAllPost(data.post));
  }, [])
  console.log(allPost);


  const GetPostData = (date) => {
    var mongooseDate = new Date(date);  // dateStr you get from mongodb

    var d = mongooseDate.getDate();
    var m = mongooseDate.getMonth() + 1;
    var y = mongooseDate.getFullYear();
    let finalDate = `${d}-${m}-${y}`;
    return finalDate;
  }


  return (
    <div className='row mypostArea'>
      {allPost.length === 0 ? <h2>No Post Yet</h2> : (

        allPost.map((ele) => {
          return (
            <div className="col-4 mt-3">
              <div className="myPostAreaPost">
                <div className="myPostAreaSinglePost">
                  <div className="row d-flex align-items-center topMyPostArea">
                    <div className="col-3">
                      <img src={
                        ele.photo !== null ? ele.photo : demoPhoto
                      } alt="not found" className='img-fluid postProfilePhoto' />
                    </div>
                    <div className="col-9 px-0">
                      <h5>Author: <span>{ele.name} {ele.lastname}</span></h5>
                      <h5>Posted at : <span>{GetPostData(ele.postdate)}</span></h5>
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

export default AllPosts
