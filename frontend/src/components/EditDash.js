import React, { useState, useEffect } from 'react';
import {useParams,useNavigate} from 'react-router-dom'
import './EditDash.css'
function EditDash(){
    const {id} = useParams();
    const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
    const [newblogtitle,setTitle] = useState('');
    const [newimageurl,setImage] = useState('');
    const [newblogcontent,setContent] = useState('');
    const [newcategory,setCategory] = useState('');
    const time = new Date();
    const navigate = useNavigate();

    useEffect(() => {
        const token=localStorage.getItem('token');
        if(!token){
            navigate('/login');
        }
		FetchData(id);
    
	}, []);

    const FetchData = (id) => {
        fetch(`http://localhost:5000/blogs/${id}`,
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

      const title = data.message[0].title;
      const image = data.message[0].image;
      const content = data.message[0].content;
      const categories = data.message[0].categories;

      const Submit = (e) =>{
        e.preventDefault();
        const updatedBlog ={
            id,
            newblogtitle,
            newimageurl,
            newblogcontent,
            newcategory,
            time
        }
    fetch(`http://localhost:5000/dashboard/blog/update/${id}`,{
        method:"PATCH",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(updatedBlog)
    })
    .then(console.log('sent'))
    .catch((err)=>{
        console.log(err);
    });
};

      

    return(
        
      <form onSubmit={Submit}>
      <label>Title
      <input  placeholder={title} onChange={(e)=>{setTitle(e.target.value)}} required/>
      </label>
      <label>Image url
      <input  placeholder={image} onChange={(e)=>{setImage(e.target.value)}} required/>
      </label>
      <label>Content
      <input  placeholder={content} onChange={(e)=>{setContent(e.target.value)}} required/>
      </label>
      <label>category
      <input placeholder={categories} onChange={(e)=>{setCategory(e.target.value)}} required/>
      </label>
      
      <input type="submit" value="Update"/>
  </form>
        
    )

}
export default EditDash