import React, { useState, useEffect } from 'react';
import { useNavigate ,Link,useParams} from "react-router-dom";
import Dashboard from './Dashboard';

function Catnew(){
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [catname,setCatname] = useState('');

    useEffect(()=>{
        const token=localStorage.getItem('token');
        if(!token){
            navigate('/login');
        }
      }, [])

      const Submit = (e) =>{
        e.preventDefault();

        const newCat ={
          catname
        }
    fetch(`http://localhost:5000/dashboard/categories/add`,{
        method:"POST",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(newCat)
    }
    ).then(console.log('sent')
    ).catch((err)=>{
        console.log(err)
    });
};

    return(
        <>
        <Dashboard/>
        <div>
            <form onSubmit={Submit}>
                <h1>Add new Cat</h1>
                <input  required  onChange={(e)=>{setCatname(e.target.value)}}/>
                <input  type="submit" value="submit"/> 
            </form>
        </div>
        </>
    )
}
export default Catnew;