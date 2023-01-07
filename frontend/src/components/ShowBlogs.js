import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import './ShowBlogs.css'
import { Router, Route, Link,useNavigate } from 'react-router-dom'
const axios = require('axios');




function ShowBlogs() {
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        const token=localStorage.getItem('token');
        if(!token){
            navigate('/login');
        }
        getBlogs();

    }, []);
    function getBlogs() {
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
    }

    function onDeleteUser(id) {
        if (window.confirm("Are you sure to Delete this Blog?")) {
            fetch(`http://localhost:5000/dashboard/blog/delete/${id}`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" }

            })
                .then(res => {
                    console.log("Deleted", res)
                    getBlogs()

                }).catch(err => { console.log(err) })
        }
    }

    if (loading) return "Loading Data";
    if (error) return "Error" + error;
    return (
        <>
        <Dashboard/>
        
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No</th>
                        <th style={{ textAlign: "center" }}>Title</th>
                        <th style={{ textAlign: "center" }}>like</th>
                        <th style={{ textAlign: "center" }}>dislike</th>
                        <th style={{ textAlign: "center" }}>categories</th>
                        <th style={{ textAlign: "center" }}>Time</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.message.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.like}</td>
                                <td>{item.dislike}</td>
                                <td>{item.categories}</td>
                                <td>{item.time.split("T")[0]}</td>
                                <td>
                                <Link to={`/login/dashboard/add`}>
                                        <button className='btn btn-add'>Add</button>
                                    </Link>
                                    <Link to={`/dashboard/blog/update/${item._id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => onDeleteUser(item._id)}>Delete</button>
                                    {/* <button className='btn btn-view'>Comments</button> */}
                                </td>

                            </tr>
                        )
                    })}
                </tbody>

            </table>

        
        </>




    )
}
export default ShowBlogs;