import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Dashboard from "./Dashboard";

function AddCat() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    getCat();
  }, []);
  function onDeleteCat(id) {
    if (window.confirm("Are you sure to Delete this Blog?")) {
      fetch(`http://localhost:5000/dashboard/categories/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          console.log("Success");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function getCat() {
    fetch("http://localhost:5000/dashboard/categories/read", {
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
            <th style={{ textAlign: "center" }}>Categorie Name</th>
            <th style={{ textAlign: "center" }}>Categorie ID</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.message.map((item, index) => {
            return (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>{item.name}</td>
                <td style={{ textAlign: "center" }}>{item._id}</td>
                <td style={{ textAlign: "center" }}>
                  <Link to={`/login/cat/add`}>
                    <button className="btn btn-edit">Add</button>
                  </Link>
                  <Link to={`/login/cat/edit/${item._id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>

                  <button
                    onClick={() => onDeleteCat(item._id)}
                    className="btn btn-delete"
                  >
                    Delete
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
export default AddCat;
