import { React, useState, useEffect } from "react";
import "./Comment.css";
function Comment({ text, time }) {
  let date = time.split("T")[0];
  return (
    <>
      <div class="container1">
        <div class="dialogbox">
          <div class="body4">
            <span class="tip tip-up"></span>
            <div class="message">
              <span>{text}</span>
            </div>
            <div className="time">{date}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Comment;
