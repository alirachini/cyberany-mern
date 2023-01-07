import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Dashboard from './Dashboard';
import './editContact.css'


function EditContact(){
    const navigate =useNavigate();

    const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
    const [aboutinput,setAboutinput] = useState('');
    
    
    useEffect(() => {
        const token=localStorage.getItem('token');
        if(!token){
            navigate('/login');
        }
		FetchData();
    
	}, []);

    const Submit = (e) =>{
        e.preventDefault();
        const updatedAbout ={
            aboutinput,
        }
    fetch(`http://localhost:5000/dashboard/aboutus/update`,{
        method:"PATCH",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(updatedAbout)
    })
    .then(console.log('sent'))
    .catch((err)=>{
        console.log(err);
    });
};

    const FetchData = () => {
        fetch(`http://localhost:5000/dashboard/aboutus/read`,
                {headers: { "Content-Type" : "application/json" }})
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
      if(loading) return "Loading Data";
      if (error) return "Error" + error;
      console.log(data);    


    return(
        <>
        <Dashboard/>
        <form className='d' onSubmit={Submit}>
            <h2 className='hh'>Edit About</h2>
            <textarea
            required
            className='textyy'
            placeholder={data.message[0].body}
            onChange={(e)=>{setAboutinput(e.target.value)}}
            ></textarea>
            <button className='ii' type="submit">Submit</button> 
        </form>
        </>

    )
}
export default EditContact;