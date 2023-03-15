import React from 'react';
import './login.css';
import ReactDOM from 'react-dom';
import icon from './favicon.ico';
import AOS from 'aos';

class LoginUser extends React.Component
{
	constructor(){
		super();
		AOS.init()
		this.state={username:'',password:'',btnState:'btn btn-default'}
		this.SendLogin=this.SendLogin.bind(this)
	}
	componentDidMount(){
		localStorage.clear();
	}
	SendLogin(){
		if(this.state.username&&this.state.password){
		const create=({
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({username:this.state.username,password:this.state.password})
		});
		async function AdminLogin(){
			const w=await fetch("https://admindashboard-elitelogin87-gmailcom.vercel.app/user/admin/login",create);
			return await w.json()
		}
		AdminLogin().then(response=>{
			response.status=="OK"?(
				response.data.map(k=>{
					localStorage.setItem("authorization",k.uid)||
					localStorage.setItem("email",k.username)||
					localStorage.setItem("admin",k.isAdmin)
				})&&setTimeout(()=>{this.setState({btnState:'btn btn-default disabled'})},1000)
				&&setTimeout(()=>{window.location="/admin"},2200)

				):(setTimeout(()=>{ReactDOM.render(<div className="alert alert-danger" 
						style={{backgroundColor:'red',color:'white'}}
						data-aos="fade-down" data-aos-duration="500">{response.message}</div>,
						document.getElementById('responseTest'))
					},2000)
					
				)
					setTimeout(()=>{
						ReactDOM.render("",document.getElementById("responseTest"))
					},4000)
			})
		}
	}
	render()
	{
		return(
				<div className="container">
					<center>
						<span id="responseTest"></span>
					</center>
					<div className="row">
						<div className="col-lg-3"></div>
						<div className="col-lg-6">
							<div className="card" id="userlogin"
								style={{boxShadow:'0px 0px 2px 2px #9B9B9F',backgroundColor:'#4520B'}}
							>
								<div className="card-header" style={{backgroundColor:'transparent'}}>
									<center><h4 style={{color:'#4B7764'}}><img src={icon} style={{height:'40px',width:'40px'}} className='img-fluid'/>{"Elite Login"}</h4></center>
								</div>
								<div className="card-body">
									<div className="form-group" id="loginform">
										<br/>
										<div id="firsting" style={{display:'flex',textAlign:'left'}}>
											<i className="fa fa-user" style={{fontSize:'30px',zIndex:20}}></i>
											<input
											style={{border:'1px solid blue',outlineColor:'white'}}

											 onChange={(e)=>this.setState({username:e.target.value})} type="text"
											 placeholder="example@mail.com" className="form-control"/>

										</div>	
										<br/>
										<div id="seconding" style={{display:'flex',textAlign:'left'}}>
											<i className="fa fa-key" style={{fontSize:'30px',zIndex:20}}></i>	
											<input onChange={(e)=>this.setState({password:e.target.value})} 
											style={{border:'1px solid blue',outlineColor:'transparent',outline:0}}
											type="password"
											 placeholder="Password" className="form-control"/>
										</div>
										<br/>
										<a type="button" onClick={this.SendLogin} id="myloginbtn" 
										className={this.state.btnState}><center style={{color:'white'}}>{"Signin"}</center></a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			);
	}
}

export default LoginUser;