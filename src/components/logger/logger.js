import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import './logger.css';

const Logger=()=>{
	const [pl,k]=useState('')
	useEffect(()=>{
		const j=({
			method:'GET',
			headers:{'Content-Type':'application/json','Authorization':localStorage.getItem('authorization')}
		});
		async function Send(){
			const wq=await fetch("https://admindashboard-delta.vercel.app/user/admin/info",j);
			return await wq.json()
		}
		Send().then(resp=>{
			if(resp.status==="OK"){
				
				setInterval(()=>{
					const checkdate=new Date();
					const myTime=checkdate.toString().split(" ")
					let timerender=`Time: ${myTime[4]}+${myTime[5]}`;
					const userdate=`Date: ${checkdate.getFullYear()}-${checkdate.getMonth()}-${checkdate.getDay()}`;
					ReactDOM.render(timerender,document.getElementById("timeonly"))
					ReactDOM.render(userdate,document.getElementById("datetime"))
				},1000);

				const h=(<ul className="nav flex-column" id="testflex">
						<li className="nav-item"><pre>{`Host: ${resp.info.hostname}`}</pre></li>
						<li className="nav-item"><pre>{`IP: ${resp.info.ip}`}</pre></li>
						<li className="nav-item"><pre>{`Client: ${resp.info.client_ip}`}</pre></li>
						<li className="nav-item"><pre>{`Version: ${resp.info.Server_Version}`}</pre></li>
						<li className="nav-item"><pre id="datetime"></pre></li>
						<li className="nav-item"><pre id="timeonly"></pre></li>
						<li className="nav-item"><pre id="lastlogin">{`Last-Login: ${resp.info.last_login}`}</pre></li>

					</ul>
					);
				ReactDOM.render(h,document.getElementById('main_log'))
			}
		})
	},[])
	return(
					<div className="jumbotron" id="logjumbo" style={{backgroundColor:'transparent',border:'1px solid blue',overflowX:'scroll'}}>
						<center>
							<div id="main_log" style={{textAlign:'left'}}></div>
						</center>
					</div>
		);
}
export  {Logger};