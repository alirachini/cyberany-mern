import React, { useState, useEffect } from 'react';
import { render } from "react-dom";
import './BlogCards.css'
import { Router, Route, Link } from 'react-router-dom'
import fullBlog from './fullBlog';

function BlogCards({title,content,image,time,id}){
  
  let date = time.split("T")[0];
    return(
      <div className="Card">
      <Link to={`blogs/${id}`}>
        <img src={image} alt="Computer" className="Card__Image" />
      </Link>
      <div className="Card__Content">
        <p className='Content__Description'>{title}</p>
        <a href="#blog-post" className="Content__Title">
          <div className="Title__Text">
         {content}

          </div>
        </a>
        <div className="Content__Footer">
          <div className="Footer__Meta">
            {/* <a className="Meta__cat">{id}</a> */}
            <div className="Meta__Date">{date}</div>
          </div>
        </div>
      </div>
    </div>

    );
}
export default BlogCards;
