import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./editContact.css";
import Dashboard from "./Dashboard";

function DashComments() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    getBlogs();
  }, []);

  function getBlogs() {
    fetch("http://localhost:5000/login/dashboard/blog/read", {
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
  }
  if (loading) return "Loading Data";
  if (error) return "Error" + error;
  console.log(data);

  return (
    <>
    <Dashboard/>
    <div className="sd">
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Title</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.message.map((item, index) => {
            return (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>{item.title}</td>
                <td style={{ textAlign: "center" }}>
                  <Link to={`/comments/${item._id}`}>
                    <button className="btn btn-edit">Comments</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  );
}
export default DashComments;
