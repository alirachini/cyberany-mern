import React, { useState, useEffect } from 'react';
import './AboutUs.css';
import about from '../aboutus-removebg-preview.png'
import  Sidebar  from "./Sidebar";

const AboutUs = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("http://localhost:5000/dashboard/aboutus/read",
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
	}, []);

	if(loading) return "Loading Data";

	if (error) return "Error" + error;
	console.log(data);

	return (
		<>
		<Sidebar/>
		
		<div class="sectionn">
			<div class="containerr">
				<div class="content-section">
					<div class="titlee">
						<h1>About Us</h1>
					</div>
					<div class="content">
						{/* <h3>{body}</h3> */}
						<p>{data.message[0].body}</p>
					</div>
				</div>
				<div class="image-section">
					<img src={about}></img>
				</div>
			</div>
		</div>
		</>

	)

}

export default AboutUs;