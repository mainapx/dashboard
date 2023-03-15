import React,{useState,useEffect} from 'react';
import {ContextHandler} from '../container/mainAdmin.js';
import './headerButton.css';

function Notifications({setStateAnother}){
	const [getState,setHandler]=useState(9);
	useEffect(()=>{
		if(getState!=-1){
			setTimeout(()=>{setHandler(getState-1)},1000)
		}else{setHandler(9)}
	},[getState])
	return(
			<>
				<center>
					<div id="AnimateStyle"><h5>{getState}</h5></div>
				</center>				
			</>
		);
}

const HeaderButton=()=>{
	const [getColor,setColor]=useState({textStyleColor:'white',numberColor:'bold'});
	const [getValue,setValue]=useState({firstValue:0,secondValue:0,thirdValue:0,fourthValue:0})
	return(
			<React.Fragment>
				<ContextHandler.Consumer>{data=>{
					setTimeout(()=>{
						data==null?console.log('ok'):(
						setValue({firstValue:data[0]['total'],secondValue:data[0]['processing'],thirdValue:data[0]['expire'],fourthValue:data[0]['new']}))
					},7000)
				}}
				</ContextHandler.Consumer>
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="card" id="flexcard" style={{backgroundColor:'#DADCE0',border:0,width:'1100px'}}>
								<div className="card-body">
								<ul id="flexer"
									style={{display:'flex',
									justifyContent:'space-between'
								}}>

									<li className="card flex-row flex-wrap" 
											style={{backgroundColor:'#514DA0',
											alignItems:'center',
											borderBottomLeftRadius:'2px',
											borderTopLeftRadius:'2px',
											borderTopRightRadius:'2px',
											borderBottomRightRadius:'2px',
											paddingBottom:0
										}}>
										
										<div className="card-body" style={{paddingBottom:0,paddingTop:'1px'}}>
											<center>
											<ul style={{listStyle:'none'}}>
											<li><span style={{color:getColor.textStyleColor}}>
											{"Tickets"}</span></li>
											<li><h3 style={{color:getColor.textStyleColor}}>
											{'Total'}</h3></li>
										</ul></center>
										</div>

										<div className="card-footer" style={{
										height:'100%',backgroundColor:'rgb(107,92,181)',
										paddingBottom:0,paddingTop:'2px'
									}}>
												<center>
												<h3 style={{color:getColor.textStyleColor,
													fontWeight:getColor.numberColor,paddingTop:'15px'}}>{getValue.firstValue}
													</h3
													>
												</center>
										</div>
								
									</li>
							
									<li className="card flex-row flex-wrap" 
											style={{backgroundColor:'rgb(77,77,77)',
											alignItems:'center',
											borderBottomLeftRadius:'2px',
											borderTopLeftRadius:'2px',
											borderTopRightRadius:'2px',
											borderBottomRightRadius:'2px',
											paddingBottom:0
										}}>
										
										<div className="card-body" style={{paddingBottom:'0px',paddingTop:'2px',
										}}>
											<center>
											<ul style={{listStyle:'none'}}>
											<li><span style={{color:getColor.textStyleColor}}>
											{"Tickets"}</span></li>
											<li><h3 style={{color:getColor.textStyleColor}}>
											{'Valid'}</h3></li>
										</ul></center>
										</div>

										<div className="card-footer" style={{
										height:'100%',backgroundColor:'rgb(91,91,94)',
										paddingBottom:'0px',paddingTop:'2px'
									}}>
												<center>
												<h3 style={{color:getColor.textStyleColor,
													fontWeight:getColor.numberColor,paddingTop:'15px'}}>{getValue.secondValue}
													</h3
													>
												</center>
										</div>
								
									</li>
									
									<li className="card flex-row flex-wrap" 
											style={{backgroundColor:'#514DA0',
											alignItems:'center',
											borderBottomLeftRadius:'2px',
											borderTopLeftRadius:'2px',
											borderTopRightRadius:'2px',
											borderBottomRightRadius:'2px',
											paddingBottom:0
										}}>
										
										<div className="card-body" style={{paddingBottom:'0px',paddingTop:'2px',
											paddingLeft:'0px'
									}}>
											<center>
											<ul style={{listStyle:'none'}}>
											<li><span style={{color:getColor.textStyleColor}}>
											{"Tickets"}</span></li>
											<li><h3 style={{color:getColor.textStyleColor}}>
											{'Expire'}</h3></li>
										</ul></center>
										</div>

										<div className="card-footer" style={{
										height:'100%',backgroundColor:'rgb(107,92,181)',
										paddingBottom:'0px',paddingTop:'2px'
									}}>
												<center>
												<h3 style={{color:getColor.textStyleColor,
													fontWeight:getColor.numberColor,paddingTop:'15px'}}>{getValue.thirdValue}
													</h3
													>
												</center>
										</div>
								
									</li>

									<li className="card flex-row flex-wrap" 
											style={{backgroundColor:'rgb(230,90,21)',
											alignItems:'center',
											borderBottomLeftRadius:'2px',
											borderTopLeftRadius:'2px',
											borderTopRightRadius:'2px',
											borderBottomRightRadius:'2px',
											paddingBottom:0
										}}>
										
										<div className="card-body" style={{paddingBottom:'0px',paddingTop:'2px',
											paddingLeft:'0px'
									}}>
											<center>
											<ul style={{listStyle:'none'}}>
											<li><span style={{color:getColor.textStyleColor}}>
											{"Tickets"}</span></li>
											<li><h3 style={{color:getColor.textStyleColor}}>
											{'New'}</h3></li>
										</ul></center>
										</div>

										<div className="card-footer" style={{
										height:'100%',backgroundColor:'rgb(223,120,44)',
										paddingBottom:'0px',paddingTop:'2px'
									}}>
												<center>
												<h3 style={{color:getColor.textStyleColor,
													fontWeight:getColor.numberColor,paddingTop:'15px'}}>{getValue.fourthValue}
													</h3
													>
												</center>
										</div>
								
									</li>
								</ul>
							</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<Notifications setStateAnother={setValue} />
						</div>
					</div>
				</div>
			</React.Fragment>
		);
}
export default HeaderButton;