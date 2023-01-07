import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom";
import Dashboard from './Dashboard';

function EditCat() {
    const navigate = useNavigate();
    const {id} = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const[newcatname,setNewcatname] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, []);
    const Submit = (e) =>{
        e.preventDefault();
        const updatedCat ={
            newcatname
        }
    fetch(`http://localhost:5000/dashboard/categories/update/${id}`,{
        method:"PATCH",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(updatedCat)
    })
    .then(console.log('sent'))
    .catch((err)=>{
        console.log(err);
    });
};

    return(
        <>
        <Dashboard/>
        <form onSubmit={Submit}>
            <h1>Edit Cat name Here</h1>
            <input required onChange={(e)=>{setNewcatname(e.target.value)}}/>
            <input type="submit" value="Update"/>

        </form>
        </>
    )


}
export default EditCat;