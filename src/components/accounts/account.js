import AOS from 'aos';
import React,{useEffect,useState} from 'react';
import $ from 'jquery';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactDOM from 'react-dom';
import  './account.css';

function ShowAdminUsers(){
	const [getResponse,setResponse]=useState();
	const [aa,bb]=useState(<CircularProgress />)
	useEffect(()=>{
	const j=({
			method:'GET',
			headers:{'Content-Type':'application/json','Authorization':localStorage.getItem('authorization')}
		});
		async function Send(){
			const wq=await fetch("https://admindashboard-delta.vercel.app/user/admin/users",j);
			return await wq.json()
		}
		Send().then(ik=>{
			if(ik.status=="OK"){
				setResponse(ik.users)
			}
		})
	},[])
	return(
			<>
				<ul className="nav flex" id="titleadmin"  style={{display:'flex',justifyContent:'space-between'}}>
					<li classNmae="nav-item"><h5 style={{fontWeight:'bold'}} className="nav-item">{"Username"}</h5></li>
					<li classNmae="nav-item"><h5 style={{fontWeight:'bold'}} className="nav-item">{"Password"}</h5></li>
					<li classNmae="nav-item"><h5 style={{fontWeight:'bold'}} className="nav-item">{"UID"}</h5></li>
					<li classNmae="nav-item"><h5 style={{fontWeight:'bold'}} className="nav-item">{"isAdmin"}</h5></li>
				</ul>
				<hr style={{width:'100%'}}></hr>
				<br />
				{getResponse?getResponse.map(w=>(
				<ul className="nav" style={{display:'flex',justifyContent:'space-between'}}>	
					<li className="nav-item"><input data-toggle="tooltip" title="You Cannot Edit" data-placement="top" type="text" value={w.username} className="form-control" disabled /></li>
					<li className="nav-item"><input  data-toggle="tooltip" title="You Cannot Edit" data-placement="top" type="password" value={w.password} className="form-control" disabled /></li>
					<li className="nav-item"><input  data-toggle="tooltip" title="You Cannot Edit" data-placement="top" type="text" value={w.uid} className="form-control" disabled /></li>
					<li className="nav-item"><input  data-toggle="tooltip" title="You Cannot Edit" data-placement="top" type="text" value={w.isAdmin} className="form-control" disabled /></li>
				</ul>)):<CircularProgress />}
			</>
		);
}
function TableDisplay(){
	const [getValue,setValue]=useState({username:'',firstname:'',lastname:'',
		passwords:'',tokensize:'',role:'admin',passwordformat:''})
	
	const [checkBtnState,setBtnState]=useState('btn btn-default disabled');
	const [getSpiner,setSpiner]=useState({circlestate:'Create New',buttonstate:'btn btn-default disabled'})
	useEffect(()=>{
		AOS.init();
		(getValue.username&&getValue.firstname&&getValue.passwords&&getValue.lastname&&getValue.tokensize&&getValue.passwordformat)!=''?(
			setBtnState('btn btn-default')
		):setBtnState('btn btn-default disabled')
		
	},[getValue])

	function CreateUser(){
		setSpiner(pres=>({...pres,circlestate:<CircularProgress style={{color:'white'}} size='1rem' />}))
		setBtnState('btn btn-default disabled')
		const j=({
			method:'POST',
			headers:{'Content-Type':'application/json','authorization':localStorage.getItem("authorization")},
			body:JSON.stringify({...getValue})
		})
		async function SendAdmin(){
			const q=await fetch("https://admindashboard-delta.vercel.app/user/admin/create",j)
			return await q.json()
		}
		SendAdmin().then(resp=>{
			setTimeout(()=>{
				if(resp.status=="OK"){
					const u=(<div data-aos="fade-down" data-aos-duration="500" style={{backgroundColor:'green',color:'white'}}
						className="alert alert-success">
								{resp.message}</div>
						)
					ReactDOM.render(u,document.getElementById("response"))
				}else{
					const u=(<div data-aos="fade-down"  style={{backgroundColor:'red',color:'white'}} data-aos-duration="500" className="alert alert-danger">
								{resp.message}</div>
						)
					ReactDOM.render(u,document.getElementById("response"))
				}
				setTimeout(()=>{ReactDOM.render("",document.getElementById("response"))},1500)
				setSpiner({circlestate:'Create New'})
				setBtnState('btn btn-default')
			},1000)
		})
	}

	return(
			<div className="form-group" id="tableform" style={{width:'1000px'}}>
				<ul className="nav" id="firstul" >
					<li className="nav-item"><input type="text" 
						onChange={(e)=>setValue(previous=>({...previous,username:e.target.value}))} required 

					placeholder="Username ex(example@mail.com)"
						 className="form-control" /></li>
					<li className="nav-item">
					<input required onChange={(e)=>setValue(previous=>({...previous,passwords:e.target.value}))} type="password" placeholder="Password"
											 className="form-control" /></li>
					<li className="nav-item">

					<input required type="text"  onChange={(e)=>setValue(previous=>({...previous,firstname:e.target.value}))} placeholder="Firstname"
											 className="form-control" /></li>
					<li className="nav-item">

					<input required type="text" placeholder="Lastname" 
							onChange={(e)=>setValue(previous=>({...previous,lastname:e.target.value}))}
											 className="form-control" /></li>
					<li className="nav-item">

					<select className="form-control" onChange={(e)=>setValue(previous=>({...previous,tokensize:e.target.value}))} >
						<option selected value="Token Format" disabled>{"Token Format"}</option>
						<option value="jwt">{"JWT"}</option>
						<option value="sha512">{"Base64+SHA512"}</option>
					</select></li>
					
					<li className="nav-item">
					<input required type="text" placeholder="Role" 
						 className="form-control" value="Admin" disabled /></li>

					<select 
					onChange={(e)=>setValue(previous=>({...previous,passwordformat:e.target.value}))} placeholder="Please Choose Password Format" className="nav-item form-control">
						<option selected disabled>{"Please Choose Password Format"}</option>
						<option value="sha512">{"SHA512"}</option>
						<option value="sha256">{"SHA256"}</option>
						<option value="sha336">{"SHA384"}</option>
						<option value="md5">{"MD5"}</option>
						<option value="sha224">{"SHA224"}</option>
					</select>
				</ul>				
				<a type="button"
				 id="createbutton" onClick={CreateUser} className={checkBtnState}>{getSpiner.circlestate}</a>
			</div>	
		);
}

function CreateOperation(e){
	e.target.value==="CreateAdmin"?ReactDOM.render(<TableDisplay />,document.getElementById('formtest')):ReactDOM.render("",document.getElementById("formtest"))
}
const AdminUserCreate=()=>{				

	return(
			<React.Fragment>
				<div className="row">
					<div className="col-lg-1"></div>
					<div className="col-lg-10">
						<div id="response"></div>
						<div id="collection">
							<center><h3>Create User</h3></center>
							<div id="checkoption">
							<select id="myoptions" className="form-control testoption" onChange={CreateOperation}>
								<option id="w1" selected="selected">--Select following--</option>
								<option id="w2" value="CreateAdmin">Create User</option>
							</select>
							</div>
							<br />
							<div id="formtest"></div>
							<br/>
							<div className="row">
								<div className="col-lg-12">
									<div id="card" id="adminuser" style={{boxShadow:'0px 0px 2px 2px #9B9B9F'}}>
										<div className="card-header"><h3>{"Admin Users"}</h3></div>
											<div className="card-body" style={{backgroundColor:'white'}}> 
												<ShowAdminUsers />
											</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
}
export default AdminUserCreate;