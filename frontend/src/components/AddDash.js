import React, { useState, useEffect } from "react";
import "./AddDash.css";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
function AddDash() {
  let navigate = useNavigate();
  // "title": "android",
  // "image": "newnewnew",
  // "content": "newblogcontetes",
  // "like": 3,
  // "dislike": 1,
  // "categories": "62bd3cb5bf6fa05e659ac1f4",

  const [blogtitle, setTitle] = useState("");
  const [imageurl, setImage] = useState("");
  const [blogcontent, setContent] = useState("");
  const [bloglike, setLike] = useState("");
  const [blogdislike, setDislike] = useState("");
  const [bcategory, setCategory] = useState("");
  const time = new Date();
  const tok = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const Submit = (e) => {
    e.preventDefault();

    const newBlog = {
      blogtitle,
      imageurl,
      blogcontent,
      bloglike,
      blogdislike,
      bcategory,
      time,
    };
    fetch(`http://localhost:5000/dashboard/blog/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlog),
    })
      .then(console.log("sent"), navigate("/dashboard/view"))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
    <Dashboard/>
    <div class="body111">
      <form onSubmit={Submit} class="form">
        <div class="title1">Add a Blog here</div>
        <div class="input-container ic1">
          <input
            className="input"
            required
            value={blogtitle}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div class="cut"></div>
          <label for="title" class="placeholder">
            Title
          </label>
        </div>
        <div class="input-container ic2">
          <input
            className="input"
            required
            value={imageurl}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <div class="cut"></div>
          <label for="Image" class="placeholder">
            Image
          </label>
        </div>
        <div class="input-container ic1">
          <input
            className="input"
            required
            value={blogcontent}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <div class="cut"></div>
          <label for="Content" class="placeholder">
            Content
          </label>
        </div>
        <div class="input-container ic2">
          <input
            className="input"
            required
            value={bloglike}
            onChange={(e) => {
              setLike(e.target.value);
            }}
          />
          <div class="cut"></div>
          <label for="like" class="placeholder">
            Like
          </label>
        </div>
        <div class="input-container ic2">
          <input
            className="input"
            required
            value={blogdislike}
            onChange={(e) => {
              setDislike(e.target.value);
            }}
          />
          <div class="cut"></div>
          <label for="dislike" class="placeholder">
            Dislike
          </label>
        </div>
        <div class="input-container ic2">
          <input
            className="input"
            required
            value={bcategory}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <div class="cut"></div>
          <label for="category" class="placeholder">
            Category
          </label>
        </div>
        <input className="submit" type="submit" value="submit" />
      </form>
    </div>
    </>
  );
}
export default AddDash;
