import HeaderButton from '../components/headerButton.js';
import Header from '../components/header/header.js';
import Sales from '../components/sales.js';
import {Griev} from '../components/griev.js';
import './main.css';
import React,{useEffect,useState} from 'react';

const ContextHandler=React.createContext()
const AdminInterface=()=>{
	document.title="Dashboard >> Admin";
	const [getData,setData]=useState(null);
	useEffect(()=>{
		setInterval(()=>{
			const h=({
				method:'GET',
				headers:{'authorization':localStorage.getItem('authorization')}
			})
			async function UserUpdate(){
				const w=await fetch("https://admindashboard-delta.vercel.app/user/admin/status",h)
				return await w.json()
			}
			UserUpdate().then(c=>{
				if(c.status=="OK"){
					setData(c.data)
				}
			})
		},10000)
	},[])
	return(
			<React.Fragment>
				<div className="main_container">
					<ContextHandler.Provider value={getData}>
						<Header />
						<HeaderButton />
						<br />
						<center><Sales />
						<br />
						<Griev /></center>
					</ContextHandler.Provider>
				</div>
			</React.Fragment>
		)
}
export {AdminInterface,ContextHandler};
