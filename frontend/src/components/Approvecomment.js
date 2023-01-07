import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Dashboard from "./Dashboard";

function Approvecomment() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data1, setData1] = useState(null);
  const [error1, setError1] = useState(null);
  const [loading1, setLoading1] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    getComments(id);
  }, []);

  function Approve(id1) {
    fetch(`http://localhost:5000/dashboard/comment/approve/${id1}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    })
      .then(console.log("approved"))
      .catch(console.log("ERROR"));
  }

  function Reject(id2) {
    fetch(`http://localhost:5000/dashboard/comment/reject/${id2}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(console.log("DELETED"))
      .catch((err) => {
        console.log(err);
      });
  }

  function getComments(id) {
    fetch(`http://localhost:5000/dashboard/comment/read/${id}`, {
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
      <Dashboard />
      <div className="sd">
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Comments</th>
              <th style={{ textAlign: "center" }}>time</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.message.map((item, index) => {
              return (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{item.text}</td>
                  <td style={{ textAlign: "center" }}>
                    {item.time.split("T")[0]}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={() => Approve(item._id)}
                      className="btn btn-edit"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => Reject(item._id)}
                      className="btn btn-delete"
                    >
                      Reject
                    </button>
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
export default Approvecomment;
