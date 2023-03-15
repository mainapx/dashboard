import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {isLoggedIn} from './auth/auth.js';

const Private=({component:Component,path})=>{
	if(isLoggedIn()==true){
		return(<Route exact path={path} component={Component} />)
	}
	return <Redirect to="/login" />
}
export {Private}