import React, { useState, useEffect } from 'react';
import './Homepage.css'
import './BlogCards.css'
import BlogCards from "./BlogCards.js";
import Sidebar from "./Sidebar";
import i from '../cyber.jpg'



const Homepage = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/login/dashboard/blog/read",
      { headers: { "Content-Type": "application/json" } })
      .then(response => {
        if (response.ok) {
          return response.json();
        } throw response;
      })
      .then(data => {
        setLoading(false);
        setData(data);
      })
      .catch(error => {
        console.error(error.message);
        setError(error);
      })
  }, []);

  if (loading) return "Loading Data";
  if (error) return "Error" + error;
  console.log(data);

  return (
    <>
      <Sidebar />
      <img className='posterimg' src={i}/>

      <div className="widget Blog">
        {/* <div className='homeImage'>
        <img src='https://picsum.photos/seed/picsum/800/400' />
      </div> */}
        {/* <div className="ads-content">
          <div className="ads-here">
            <i className="ads-img"></i>
            <i className="ads-content"></i>
            <i className="ads-button"></i>
          </div>
        </div> */}
        {/* <div class="blog-title widget-title">
    <h3 class="heading">
             Latest Posts
    </h3>
    <a class="view-all" >View all</a>
    </div> */}

        <div className="blog-posts hfeed container">
          <div className='container'>
            {data.message.map((getdata) =>
              <BlogCards title={getdata.title} content={getdata.content} image={getdata.image} time={getdata.time} id={getdata._id} />
            )}
          </div>
        </div>
        <div className="ads-content">
          <div className="ads-here">
            <i className="ads-img"></i>
            <i className="ads-content"></i>
            <i className="ads-button"></i>
          </div>
        </div>
      </div>
    </>

  );

}


export default Homepage;