import React from 'react';
import CreateModel from '../../components/createmodel/createmodel.js';
import AOS from 'aos';
import './edit.css';
import $ from 'jquery';
import {Logger} from '../../components/logger/logger.js';
import Button from '@material-ui/core/Button'
import ReactDOM from 'react-dom';
import CircularProgress from '@material-ui/core/CircularProgress';



function LoadData({setInput,updateTicket,check,deleteData}){
	return(
		<>
			{check.responseData==null?(<CircularProgress />):(
				check.responseData.map(k=>(																							
						<ul className="nav" id="respul" style={{display:'flex',backgroundColor:k.First,justifyContent:'space-between',alignItems:'center'}}>
							<li className="nav-item"><h6 style={{color:k.Second}} id="id" className="nav-link">{check.responseData.indexOf(k)}</h6></li>
							<li className="nav-item"><h6 style={{color:k.Second}} id="num"   className="nav-link">{k.ticket_number}</h6></li>
							<li className="nav-item"><h6 style={{color:k.Second}} id="expire"  className="nav-link">{k.reason}</h6></li>
							<li className="nav-item"><h6 style={{color:k.Second}} id="issue"  className="nav-link">{k.useraddress}</h6></li>
							<li className="nav-item"><h6 style={{color:k.Second}} id="expire"  className="nav-link">{k.location}</h6></li>

							<li className="nav-item"><h6 style={{color:k.Second}} id="issue"  className="nav-link">{k.status=="Processing"?(<div className="spinner-border" style={{border:0}} 
									data-toggle="tooltip" title="Under Processing" data-placement="top"

								><i className='fa fa-refresh' 
									style={{fontSize:'30px',color:'black'}}></i></div>):(k.status)}</h6></li>
							<li className="nav-item"><Button data-toggle="tooltip" 
							data-placement="top" title="Delete" className="nav-link" style={{borderRadius:'50%',
							height:'60px',outline:'none'}}><i  onClick={deleteData} className="fa fa-trash"

							 style={{fontSize:'20px',color:k.Second}}></i></Button></li>
						</ul>
		
		)))}
	</>
	);
}

class Operational extends React.Component{
	constructor(){
		super()
		AOS.init()
		this.updateTicket=this.updateTicket.bind(this)
		this.deleteTicket=this.deleteTicket.bind(this)
		this.setInput=this.setInput.bind(this);
		this.state={cardComp:<LoadData 
									setInput={this.setInput}
									updateTicket={this.updateTicket}
									check={this.state}
								/>,responseData:null,updateNumber:'',updateExpire:'',counter:0,updateIssue:'',setFunction:this.setInput}

	}

	setInput(e){
		this.setState({first:'',updateIssue:'',updateExpire:''})
		const hw=e.target.parentElement.parentElement.parentElement.parentElement.querySelectorAll("li");
		for(let k=2;k<=3;k++){
				if(hw[k].childNodes[0].getAttribute("id")=="num"){
				const replacer=(<input type="text" 
						onChange={(e)=>this.setState({updateNumber:e.target.value})}
					 placeholder={"100-100-100-100"}/>)
				ReactDOM.render(replacer,hw[k].childNodes[0])

			}else if(hw[k].childNodes[0].getAttribute("id")=="issue"){
					 	const replace1=(<input 
					 			onChange={(e)=>this.setState({updateIssue:e.target.value})} type="date" />)
						ReactDOM.render(replace1,hw[k])

					 }else if(hw[k].childNodes[0].getAttribute('id')=="expire"){
					 	const replace1=(<input 
					 			onChange={(e)=>this.setState({updateExpire:e.target.value})}
					 			 type="date" />)
						ReactDOM.render(replace1,hw[k])
					 }else{}
		}
		e.target.tagName==`I`?e.target.setAttribute("class","fa fa-check"):console.log('')
	}
	componentDidMount(){
		const fetcher=({
			method:'GET',
			headers:{'Content-Type':'application/json',
				authorization:localStorage.getItem("authorization"),
				email:localStorage.getItem("email")},

		})
		async function GetData(){
			const c=await fetch("https://admindashboard-delta.vercel.app/user/admin/get",fetcher);
			return await c.json()
		}
		GetData().then(response=>{
			response.data.length?this.setState({responseData:response.data}):(
				setTimeout(()=>{ReactDOM.render(<center><h4>{"No Ticket Found"}</h4></center>,
					document.querySelector(".Main_data")
					)},4000))
		})
	}

	updateTicket(e){
		if(e.target.tagName==`I`){
			const updateTicket=({
				method:'PUT',
				headers:{'Content-Type':'application/json',
					authorization:localStorage.getItem("authorization")},
				body:JSON.stringify({
					email:localStorage.getItem("email"),
					issue:this.state.updateIssue,
					expire:this.state.updateExpire,
					ticket_number:this.state.updateNumber
				})
			});
			async function UpdateUserTicket(){
				const w=await fetch("https://admindashboard-delta.vercel.app/user/admin/update",updateTicket);
				return await w.json()
			}
			UpdateUserTicket().then(response=>{
				response.status=="OK"?(
					ReactDOM.render(<div className="alert alert-succes" data-aos-duration="500"
						data-aos="fade-down"
						style={{backgroundColor:'green',color:'white'}}
						>{response.message}</div>,document.getElementById('operationResponse')
					)):(
						ReactDOM.render(<div className="alert alert-danger" data-aos-duration="500"
							data-aos="fade-down"
							style={{backgroundColor:'red',color:'white'}}
							>{response.message}</div>,document.getElementById('operationResponse'))
					)
				setTimeout(()=>{
					ReactDOM.render("",document.getElementById("operationResponse"))},2000)
			})
		}
	}

	deleteTicket(e){
		const pl=e.target.parentElement.parentElement.parentElement.parentElement.querySelector("li:nth-child(2) >h6").innerHTML
		console.log(pl)
		const deleteTicket=({
			method:'DELETE',
			headers:{'Content-Type':'application/json',
			authorization:localStorage.getItem("authorization"),Ticket_Number:pl}
		});
		async function DeleteUserTicket(){
			const w=await fetch(`https://admindashboard-delta.vercel.app/user/admin/delete`,deleteTicket);
			return await w
		}
		DeleteUserTicket().then(response=>{
			setTimeout(()=>{
			response.status==204?(
					ReactDOM.render(<div className="alert alert-success" data-aos-duration="500"
						data-aos="fade-down"
						style={{backgroundColor:'green',color:'white'}}
						>{"Successfully Ticket Deleted"}</div>,document.getElementById('operationResponsing')
					)):(ReactDOM.render(<div className="alert alert-danger" data-aos-duration="500"
						data-aos="fade-down"
						style={{backgroundColor:'red',color:'white'}}
						>{response.message}</div>,document.getElementById('operationResponsing')
					))
				},1000)
			setTimeout(()=>{ReactDOM.render("",document.getElementById('operationResponsing'))},2500)
		})

	}
	
	render(){
		return(
				<>
					<Logger />
					<br />

					<div className="card" id="editcard" style={{boxShadow:'0px 0px 2px 2px #9B9B9F'}}>
						<div className="card-header">
							<center><h5>{"Elite System"}</h5></center>
							<Button style={{

								borderRadius:'50%',
								height:'60px',outline:'none'}}>
							<i onClick={()=>window.location="/edit"}

							 className='fa fa-refresh' data-toggle="tooltip" data-placement="top"

							 title="Refresh" style={{fontSize:'20px',color:'skyblue'}}></i>
							</Button>
							
							<div id="operationResponsing" style={{position:'relative'}}></div>
						</div>
						<div id="responseError"></div>
						<div className="card-body" id="responseMain">
							<ul className="nav" id="titleul" style={{justifyContent:'space-between'}}>
								<li className="nav-item"><span className="nav-link" style={{fontSize:'18px',fontWeight:'bold'}}>{"S.no"}</span></li>
								<li className="nav-item"><span className="nav-link" style={{fontSize:'18px',fontWeight:'bold'}}>{"TicketNumber"}</span></li>
								<li className="nav-item"><span className="nav-link" style={{fontSize:'18px',fontWeight:'bold'}}>{"Reason"}</span></li>
								<li className="nav-item"><span className="nav-link" style={{fontSize:'18px',fontWeight:'bold'}}>{"EmailAddress"}</span></li>
								<li className="nav-item"><span className="nav-link" style={{fontSize:'18px',fontWeight:'bold'}}>{"Location"}</span></li>
								<li className="nav-item"><span className="nav-link" style={{fontSize:'18px',fontWeight:'bold'}}>{"Status"}</span></li>
								<li className="nav-item"><span className="nav-link" style={{fontSize:'18px',fontWeight:'bold'}}>{"Discard"}</span></li>

							</ul>
							<hr style={{width:'100%',fontWeight:'bold'}}></hr>
							<div className="Main_data">
								<LoadData 
									setInput={this.setInput}
									updateTicket={this.updateTicket}
									check={this.state}
									deleteData={this.deleteTicket}
								/>
							</div>
						</div>
					</div>
				</>
			);
	}
}
export default Operational;