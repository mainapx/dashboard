import HeaderButton from '../components/headerButton.js';
import Operational from '../components/edit/edit.js';
import Header from '../components/header/header.js';
import './main.css';
import CreateModel from '../components/createmodel/createmodel.js';
import React,{useEffect} from 'react';

const Operation=()=>{
	useEffect(()=>{document.title="Dashboard >> Edit"})
	return(
			<React.Fragment>
				<div className="main_container">
					<Header />
					<br />
					<Operational />

				</div>
			</React.Fragment>
		)
}
export default Operation;