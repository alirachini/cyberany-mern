import React, {useState, useEffect} from 'react';
import './ContactUs.css'
import contact from '../contact-removebg-preview.png'
import  Sidebar  from "./Sidebar";

 const ContactUs = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("http://localhost:5000/dashboard/contactus/read",
		{headers: {"Content-Type": "application/json"}})
		.then(response => {
			if(response.ok){
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
	}, []);
	if(loading) return "Loading..."

	if(error) return "Error" + error;
	console.log(data);
	// console.log(data.message[0].body);
	// const bodyContact = data.message[0].body;
  return (
	<>
	<Sidebar/>

<div className="sectionn">
		<div className="containerr">
			<div className="content-section">
				<div className="title1">
					<h1>Contact Us</h1>
				</div>
				<div className="content">
					<h3>{data.message[0].body}</h3>
					{/* <p>By email: wanasx@gmail.com</p> */}
				</div>
			</div>
			<div className="image-section">
				<img ></img>
			</div>
		</div>
	</div>
	</>
  )
  
}
export default ContactUs;