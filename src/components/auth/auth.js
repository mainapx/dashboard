import React from 'react';

const isLoggedIn=()=>{
	if(localStorage.getItem('authorization')){
		return true
	}
	return false
}

export {isLoggedIn}