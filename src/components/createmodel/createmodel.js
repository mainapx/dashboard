import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AOS from 'aos';
import './model.css';

const CreateModel=(props)=>{
	AOS.init();
	const [setNumber,putNumber]=useState('')
	const [setIssue,putIssue]=useState('')
	const [setExpire,putExpire]=useState('');
	const [getCircle,setCircle]=useState("Send");
	const useStyle={outline:'none',border:'1px solid blue'}
	

	function createTicket(){
		setCircle(<CircularProgress style={{color:'white',height:'20px',width:'100%'}} />);

		const create=({
			method:'POST',
			headers:{'Content-Type':'application/json',
			authorization:localStorage.getItem("authorization")},
			body:JSON.stringify({email:localStorage.getItem('email'),
				issuedate:setIssue,
				expiredate:setExpire,
				ticketnumber:setNumber
			})
		});
		async function createUserTicket(){
			const w=await fetch("https://admindashboard-elitelogin87-gmailcom.vercel.app/user/admin/new",create);
			return await w.json()
		}
		createUserTicket().then(response=>{
			if(response.status=="OK"){
				ReactDOM.render(<div className="alert alert-success" data-aos-duration="500"
					data-aos="fade-down"
					style={{backgroundColor:'green',color:'white'}}
					>{response.message}</div>,document.getElementById('createResponse'))
				}		
				else{
					ReactDOM.render(<div className="alert alert-danger" data-aos-duration="500"
					data-aos="fade-down"
					style={{backgroundColor:'red',color:'white'}}
					>{response.message}</div>,document.getElementById('createResponse')
				)}
			setTimeout(()=>{ReactDOM.render("",document.getElementById("createResponse"))},2000);
			setTimeout(()=>setCircle("Add+"),2000)
		})
	}


	return(
			<React.Fragment>
				<div className="row">
					<div className="col-lg-12">
						<div id="createResponse"></div>
						<div className="card" id="modelcard" style={{boxShadow:'0px 0px 2px 2px #9B9B9F'}}>
							<div className="card-header">
								<center><h5>{"EliteMail"}</h5></center>
							</div>
							<div className="card-body">
								<div className="form-group">

									<input onChange={(e)=>putNumber(e.target.value)} type="tel" 
										style={{width:'100%'}}
										placeholder="100-100-100-100"
										required
									/>
									<input onChange={(e)=>putIssue(e.target.value)} required style={{width:'100%'}} type="text" 
									className="form-control" placeholder="To" 
									/>
									
									<textarea row="100" colr="100" className="form-control" placeholder="Type a Message.."></textarea>
									<Button
										onClick={createTicket}
										style={{backgroundColor:'#506DED',color:'white'}}
									>{getCircle}</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
}

export default CreateModel;