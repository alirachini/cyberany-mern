import { React, useState, useEffect } from "react";
import "./fullBlog.css";
import { useParams } from "react-router-dom";
import CommentCard from "./Comment.js";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";

function FullBlog() {
  let n = 0;
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState(null);
  const time = new Date();
  const read = false;
  const blog = id;

  const [data1, setData1] = useState(null);
  const [error1, setError1] = useState(null);
  const [loading1, setLoading1] = useState(true);
  // const [like, setLike] = useState(null);

  useEffect(() => {
    FetchData(id);
    FetchComments();
  }, []);

  const FetchData = (id) => {
    fetch(`http://localhost:5000/blogs/${id}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setLoading(false);
        setData(data);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error);
      });
  };

  const FetchComments = () => {
    fetch(`http://localhost:5000/comments/${id}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data1) => {
        setLoading1(false);
        setData1(data1);
      })
      .catch((error1) => {
        console.error1(error1.message);
        setError1(error1);
      });
  };

  function liked() {
    fetch(`http://localhost:5000/like/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    })
      .then(FetchData(id))
      .catch((err) => {
        console.log(err);
      });
  }

  function disliked() {
    fetch(`http://localhost:5000/dislike/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    })
      .then(FetchData(id))
      .catch((err) => {
        console.log(err);
      });
  }

  const Submit = (e) => {
    e.preventDefault();
    const commentNew = {
      text,
      blog,
    };
    fetch(`http://localhost:5000/createcomment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentNew),
    })
      .then(console.log("sent"))
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) return "Loading Data";
  if (loading1) return "Loading Data";
  if (error) return "Error" + error;
  console.log(data1);

  return (
    <>
      <Sidebar />
      <div className="containerBlog1">
        <h1 className="title">{data.message[0].title}</h1>
        <div class="blogImg">
          <img src={data.message[0].image} alt="blogImg" />
        </div>
      </div>

      <div className="buttonContainer">
        <button type="button" class="button1" onClick={liked}>
          {" "}
          <AiOutlineLike />
          Like {data.message[0].like}
        </button>

        <button type="button" class="button1" onClick={disliked}>
          {" "}
          <AiOutlineDislike />
          Dislike {data.message[0].dislike}
        </button>
      </div>
      <div className="containerBlog">
        <div className="content">
          <p>{data.message[0].content}</p>
        </div>
        <div className="line">
          <form className="cbutton" aria-required onSubmit={Submit}>
            <textarea
              required
              onChange={(e) => {
                setText(e.target.value);
              }}
              name="text"
              cols="30"
              rows="5"
              placeholder="Leave a Comment"
              className="textareaBlog"
            />

            <input required type="submit" value="submit" />
          </form>
        </div>
        <h3>Comments</h3>
        {data1.message.map((getdata) => (
          <CommentCard text={getdata.text} time={getdata.time} />
        ))}
      </div>
    </>
  );
}

export default FullBlog;
