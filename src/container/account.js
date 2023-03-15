import AdminUserCreate from '../components/accounts/account.js';
import Header from '../components/header/header.js';
import {isLoggedIn} from '../components/auth/auth.js';
import React,{useEffect} from 'react';
const AdminUser=()=>{
	useEffect(()=>{
		document.title="Admin >> Users"
	},[])
	return(
			<React.Fragment>

				<div className="main_container">
					<Header />
					<br />
					<AdminUserCreate />
				</div>
		
			</React.Fragment>
		)
}
export default AdminUser;