const sqlhandler=require("./database.js");
const hashgenerater=require('crypto');
const fs=require('child_process');
const convertbase64=require('base-64');
const ipaddr=require('ip');
const hostnamecheck=require('os');
const statichandler=require('node-static');
const MailerTest=require('./mailer.js')
const fstest=require('fs');
const cors = require('cors');
const setjwt=require('jwt-simple');
const checkemail=require('email-validator')
const tokengenerater=require('rand-token');
const httphandler=require('http');
const sessionArray=new Array();
const bodyhandler = require('body-parser')
const testArr=new Array();
const express = require('express');
const session = require('express-session');


//MailerTest()
const setArray=new Array();
const logintime=new Array()

const HashCalculator=(password,method)=>{
	if(method=="login"){
		['sha512','md5','sha256','sha224','sha384','sha1'].map(k=>{
			let l=hashgenerater.createHash(k);
			let mainhash=l.update(password).digest('hex')
			setArray.push(mainhash)
		})
	}
}

function CreateJWToken(passwordformat,tokensize,firstname,lastname,password){

	let tokencreate
	if(tokensize=="jwt"){
		 tokencreate=setjwt.encode({'firstname':firstname,'lastname':lastname},'adminlocked','HS256')
		}else{
			tokencreate=hashgenerater.createHash(tokensize).update(convertbase64.encode(tokengenerater.generate(32))).digest('hex')
		}
	let passwordcreate=hashgenerater.createHash(passwordformat).update(password).digest('hex');
	return [tokencreate,passwordcreate]
}
function SessionChecker(req,resp,next){
	if(req.session){
		next()
	}else{
		resp.redirect("/login")
	}
}

const oneDay = 1000 * 60 * 60 * 24;
const app = express()

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(bodyhandler.json())
app.use(bodyhandler.urlencoded({extended:false}))
app.use(cors({origin:"*"}))
app.use(express.static('build'))


const errormsg=`
	<html>
	<head>

	<meta http-equiv="refresh" content="20">
	<title>DatabaseError </title>
	</head>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
 	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

	<body>
		<div class"alert alert-danger"><center>
			<h3> Webmaster Database Connect Error 1024 Please Try Again later
			</h3></center></div>
			<br><br>
			<center><h1> 500 Internal Server Error </h1></center>
	</body>
	</html>
`


app.get("/login",SessionChecker,(req,resp,next)=>{
	resp.sendFile('build/index.html' , { root : __dirname})
})
app.get("/admin",(req,resp,next)=>{
	resp.sendFile('build/index.html' , { root : __dirname})
})
app.get("/Database",SessionChecker,(req,resp,next)=>{
	resp.sendFile('build/index.html' , { root : __dirname})
})
app.get("/edit",SessionChecker,(req,resp,next)=>{
	resp.sendFile('build/index.html' , { root : __dirname})
})
app.get("/signout",SessionChecker,(req,resp,next)=>{
	resp.sendFile('build/index.html' , { root : __dirname})
})
app.get("/settings",SessionChecker,(req,resp,next)=>{
	resp.sendFile('build/index.html' , { root : __dirname})
})
app.get("/login",SessionChecker,(req,resp,next)=>{
	resp.sendFile('build/index.html' , { root : __dirname})
})

app.post("/user/admin/login",(req,resp,next)=>{
		const postlogin = req.body
		usernames=postlogin['username'];
		password=postlogin['password'];

		HashCalculator(password,"login")
		var auth=false;
		var data=null;
		let m=new Array();
			for(let i=0;i<=setArray.length;i++){
				sqlhandler.query(`SELECT * FROM admin WHERE username="${usernames}" AND password="${setArray[i]}";`,(err,result,fields)=>{
					try{
					if(result.length){
						const newDate = new Date()
						 data=JSON.parse(JSON.stringify(result))[0]
						delete data['password']
						data['isAdmin']='True'
						lastyear=newDate.getFullYear();
						lastmonth=newDate.getMonth();
						lastday=newDate.getDay();
						// time
						hours=newDate.getHours();
						minutes=newDate.getMinutes();
						seconds=newDate.getSeconds();
						checksession=data
						const getlasttime=new Date().toISOString().split("T")
						logintime.push({[data['uid']]:`${getlasttime[0]} ${getlasttime[1].toString().split(".")[0]}`})	
						m.push(data)

						}
					}catch(e){
						console.log(e)
					}
				})
			}
		function LoginStatus(){
			return new Promise((resolve,reject)=>{
				const wl=setInterval(()=>{
				if(data!=null){
					resolve('x')
					clearInterval(wl)
				}reject("Wait")
			  })
			})
		}
		let checklogin=null;
		function setLogin(){
			const sessionuser=tokengenerater.generate(32);					
			sqlhandler.query(`UPDATE admin set session_id='${sessionuser}' where uid='${data['uid']}';`)
			let mainuid=data['uid'];
			const  jw={[mainuid]:sessionuser}
			sessionArray.push(jw)

			if(m.length){
				checklogin=true
				
			}else{
				checklogin=false
			}


		}
		setTimeout(()=>{
			LoginStatus().then(p=>{
				setLogin()				
			}).catch(f=>console.log(f))

			
			if(m.length){
				req.session['isAuth'] = usernames
				resp.status(200).json({'status':'OK','message':'Success','data':[m[0]]})
				m.length=0
			}else{
				resp.status(200).json(JSON.stringify({'status':'Failed','message':'Invalid Username or Password'}))
		}},1700)
							
	})

app.get("/user/admin/get",SessionChecker,(req,resp,next)=>{

	const mainHeaders=req.headers
	const authorization=mainHeaders['authorization']

	const getemail=mainHeaders['email']
	sqlhandler.query(`SELECT * from admin where uid='${authorization}';`,(err,result,fields)=>{
		if(result!=undefined && result.length!=0){
			sqlhandler.query(`SELECT ticket_number,reason,useraddress,status,location FROM complaint;`,(err,result,fields)=>{
				if(result!=null){
					const hr=result.map(o=>{
						if(o.reason==="TicketExpired"){
							o['First']="red"
							o['Second']="white"
						}else if(o.reason=="Selected"){
							o['First']="yellow"
							o['Second']="black"
						}else if(o.status=='Resolved'){
							o['First']='green'
							o['Second']='black'
						}else{
							o['First']='white'
							o['Second']='black'
						}

					})

					resp.json({'status':'OK','message':'Success','data':result})
				}
			})
			return 
		}else{
			resp.status(401).json({'status':'Failed','message':'Authorization Token is Missing or Invalid'})
		}
	})

})
app.get("/user/admin/info",SessionChecker,(req,resp,next)=>{
	if(req.headers.authorization){
		let authorizationheader=req.headers.authorization
		sqlhandler.query(`SELECT * FROM admin WHERE uid='${authorizationheader}';`,(err,result,fields)=>{
			if(result!=null){
				const lastlogin=JSON.parse(JSON.stringify(result))[0]['last_login']
				const versiondb=fs.exec('mysql --version',(error,stdout,stdin)=>{
					if(error){	
						console.log("Error Occured")
					}
				})
				let info=null;	
				const localip=ipaddr.address();
				const getclientip=req.socket.remoteAddress;
				fs.exec('uname -a',(result,stdout)=>{info=stdout.toString()})
				
				
					const mainDetails={
						'hostname':hostnamecheck.hostname(),
						'ip':ipaddr.address(),
						'Server_Version':info,
						'client_ip':getclientip,
						'last_login':lastlogin
					}
			}else{
				resp.status(400).json({'status':'Failed','message':'Authorization Token is Missing or Invalid'});
				
			}
		})
	}

})
app.get("/user/admin/users",SessionChecker,(req,resp,next)=>{

	const authheader=req.headers.authorization
	if(authheader){

		sqlhandler.query(`SELECT * FROM admin where uid='${authheader}';`,(er1,res1,field1)=>{
			if(!er1){
				sqlhandler.query(`SELECT * FROM admin;`,(pl,cl,ml)=>{
					resp.status(200).json({'status':'OK','message':'Success','users':JSON.parse(JSON.stringify(cl))})
				})
			}else{
				resp.status(403).status({'status':'Failed','message':'Authorization Token is Invalid'})
			}
		})
	}else{
		resp.status(400).json({'status':'Failed','message':'You are not Unauthorized'})
	}

})
app.delete("/user/admin/delete",SessionChecker,(req,resp,next)=>{
	const maintest=req.headers
	const geturlauth=maintest['authorization']
	if(geturlauth){
		const getticket=maintest['ticket_number']

		sqlhandler.query(`SELECT uid from admin where uid='${geturlauth}';`,(ee,pp,ll)=>{
			if(ee == null){
				sqlhandler.query(`DELETE FROM  complaint where ticket_number='${getticket}';`,(jj,ll,pp)=>{
					resp.status(204).send()
				})
			}else{
				resp.status(401).json({'status':'Failed','message':'You are not Authorized for Deleting this Ticket'})
			}
		})
	}else{
		resp.writeHead(401,k)
		resp.status(401).json({'status':'Failed','message':'You are not Unauthorized'})
	}
})
app.post("/user/admin/create",SessionChecker,(req,resp,next)=>{
		const getauthtoken=req.headers
		const mainauth=getauthtoken['authorization']
		if(mainauth){
				bodyparser=req.body
				admincheck=JSON.parse(bodyparser)
				firstname=admincheck['firstname'];
				lastname=admincheck['lastname'];	
				passwordformat=admincheck['passwordformat'];
				passwords=admincheck['passwords'];
				role=admincheck['role'];
				tokensize=admincheck['tokensize'];
				username=admincheck['username'];
				if(checkemail.validate(username)==true){
					 if(['sha512','sha224','sha256','md5','sha384'].indexOf(passwordformat)!=-1){
							console.log(['sha512','jwt'].indexOf(tokensize.toString()))

						 if(['sha512','jwt'].indexOf(tokensize.toString())!=-1){
							 const gettokensadmin=CreateJWToken(passwordformat,tokensize,firstname,lastname,passwords)
							 sqlhandler.query(`SELECT count(*) FROM admin;`,(p1,p2,p3)=>{
								 if(JSON.parse(JSON.stringify(p2))[0]['count(*)'] < 5){
									 sqlhandler.query(`SELECT * FROM admin where username='${username}';`,(k1,k2,k3)=>{
									 if(JSON.parse(JSON.stringify(k2)).length == 0){

										 sqlhandler.query(`INSERT INTO admin(username,password,uid,isAdmin,last_login,session_id)VALUES('${username}','${gettokensadmin[1]}','${gettokensadmin[0]}','True','0000-00-00 00:00:00','0');`,(q1,q2,q3)=>{	

											 if(!q1){
												 resp.status(201).json({'status':'OK','message':'Admin User Created'})
											 }else{
												 resp.status(400).json({'status':'Failed','message':'Something is Wrong with our server Please try again'})
											 }
										 })
									 }else{
										 resp.status(400).json({'status':'Failed','message':'Admin User Exists'})
									 }
								 })
							   }else{
								   resp.writeHead(422,k);
								   resp.end(JSON.stringify({'status':'Failed','message':'Exceed Limit for Creating Users'}))
								   return
							   }
							 })
							 
						 }else{
							 resp.status(422).json({'status':'Failed','message':'Invalid Token Format'})
						 }
					 }
					 else{
						 resp.status(422).json({'status':'Failed','message':'Invalid Password Format'})
					 }

				}else{
					resp.status(400).json({'status':'Failed','message':'Invalid Email Address'})
				}
				
			}
		
	
})

app.get("/logout",SessionChecker,(req,resp,next)=>{
	if(req.session){
		req.session.destroy()
		resp.redirect("/login")
	}else{
		resp.redirect("/login")
	}
})

app.get("/user/admin/status",(req,resp,next)=>{

	const getauth=req.headers.authorization
	let totalticket=0;
	let totalnew=0;
	let totalexpire=0;
	let totalresolved=0;
	let totalprocessing=0;
	let totalpending=0;
	var h=null;

	//south
	var southtotalticket=0;
	var southtotalpending=0;
	var southtotalexpire=0;
	var southtotalresolved=0
	var southnew=0
	var southtotalprocessing=0
	
	//north
	var northtotalticket=0
	var northtotalpending=0
	var northtotalexpire=0
	var northtotalresolved=0
	var northtotalprocessing=0
	var northnew=0

	//east



	var easttotalticket=0
	var easttotalpending=0
	var eastnew=0
	var easttotalexpire=0
	var easttotalresolved=0
	var easttotalprocessing=0

	//west
	var westtotalticket=0
	var westtotalpending=0
	var westnew=0;
	var westtotalexpire=0
	var westtotalprocessing=0
	var westtotalresolved=0

	//new ticket
	var uni=null
	var checktime=new Array()
	sqlhandler.query(`SELECT uid from admin where uid='${getauth}';`,(e1,e2,e3)=>{
		if(!e1){
			const test=sqlhandler.query(`SELECT ticket_number,status,isNew,location,reason,receivetime,region FROM complaint;`,(o1,o2,o3)=>{
				h=JSON.parse(JSON.stringify(o2))
				totalticket=h.length;
					h.map(k=>{
						if(k.isNew==='True'){
							totalnew+=1
						}
						if(k.status==="Resolved"){
							totalresolved+=1
						}
						else if(k.status==="Processing"){
							totalprocessing+=1;
						}
						else if(k.reason==="Waiting"){
							totalpending+=1;
						}
						else if(k.status==='0000-00-00'){
							totalexpire+=1;
						}
						else{}

					})
					sqlhandler.query(`SELECT count(*) FROM complaint where region='south';`,(j1,j2,j3)=>{
						southtotalticket=JSON.parse(JSON.stringify(j2))['count(*)']
					})
					sqlhandler.query(`SELECT count(*) FROM complaint where region='north';`,(j1,j2,j3)=>{
						northtotalticket=JSON.parse(JSON.stringify(j2))['count(*)']
					})
					sqlhandler.query(`SELECT count(*) FROM complaint where region='east';`,(j1,j2,j3)=>{
						easttotalticket=JSON.parse(JSON.stringify(j2))['count(*)']
					})
					sqlhandler.query(`SELECT count(*) FROM complaint where region='west';`,(j1,j2,j3)=>{
						westtotalticket=JSON.parse(JSON.stringify(j2))['count(*)']
					})
					//region wise
					h.map(o=>{
						if(o.region=='south' && o.reason=='Waiting'){
							southtotalpending+=1
							southnew+=1

						}else if(o.region=='south' && o.status=='Resolved'){
							southtotalresolved+=1
						}
						else if(o.region=="south" && o.status=='Processing'){
							southtotalprocessing+=1
						}
						else if(o.region=='north' && o.status=='Resolved'){
							northtotalresolved+=1
						}
						else if(o.region=="north" && o.reason=='Waiting'){
							northtotalpending+=1
							northnew+=1
						}
						else if(o.region=="north" && o.status=='Processing'){
							northtotalprocessing+=1
						}
						else if(o.region=="east" && o.reason=='Waiting'){
							easttotalpending+=1
							eastnew+=1
						}
						else if(o.region=="east" && o.status=='Processing'){
							easttotalprocessing+=1
						}
						else if(o.region=="east" && o.status=='Resolved'){
							easttotalresolved+=1
						}
						else if(o.region=="west" && o.reason=='Waiting'){
							westtotalpending+=1
							westnew+=1
						}
						else if(o.region=="west" && o.status=='Resolved'){
							westtotalresolved+=1
						}
						else if(o.region=="west" && o.status=='Processing'){
							westtotalprocessing+=1
						}

						else{}
					})					
				// one date or single day total query
				
				let runTest=null;
				h.map(k=>{
					let totalcounts=0
					let counts=0
					var newcounts=new Array()

					let jam=new Date()
					let oow=new Date(parseInt(k.receivetime));
					let chk=new Date(oow.getUTCFullYear(),oow.getMonth(),oow.getDay())
					
					const setCounter=(hl)=>{
						newcounts.push(hl)
					}
					h.map(i=>{
						
					if(parseInt(i.receivetime)!=parseInt(k.receivetime)){

						let w1=new Date(parseInt(i.receivetime));
						let w2=new Date(w1.getUTCFullYear(),w1.getMonth(),w1.getDay())

						if((chk < w2)==false && (chk >w2)==false){
							counts+=1
							sqlhandler.query(`SELECT count(*) from complaint where receivetime='${i.receivetime}' and reason='Waiting';`,(o5,o6,o7)=>{
								const hl=JSON.parse(JSON.stringify(o6))[0]['count(*)']
								setCounter(hl)
							})
						}
					}
					if(parseInt(i.receivetime)===parseInt(k.receivetime)){
						counts+=1
						}
					})

					console.log("ewfew",newcounts)
					runTest=function(){
						return new Promise((resolve,reject)=>{
							const setinter=setTimeout(()=>{
								if(newcounts.length){
									resolve("resolved")
									clearInterval(setinter)
								}reject("failed")
							},2200)
						})
					}

					runTest().then(hw=>{
						checktime.push({'time':k.receivetime,'total':counts,'new':newcounts})
						counts=0
							uni=[...new Map(checktime.map(item=>[item['total'],item])).values()]
						testArr.push({'total':totalticket,'pending':totalpending,'expire':totalexpire,'new':totalnew,'resolved':totalresolved,'processing':totalprocessing})
						testArr.push({'southp':southtotalprocessing,'southr':southtotalresolved,'southw':southtotalpending,'southnew':southnew})
						testArr.push({'northp':northtotalprocessing,'northr':northtotalresolved,'northw':northtotalpending,'northnew':northnew})
						testArr.push({'eastp':easttotalprocessing,'eastr':easttotalresolved,'eastw':easttotalpending,'eastnew':eastnew})
						testArr.push({'westp':westtotalprocessing,'westr':westtotalresolved,'westw':westtotalpending,'westnew':westnew})						
					}).catch((e)=>{
						console.log(e)
					})
				})
				let k;
				let wg;
				const supertest=setInterval(()=>{					
					if(uni!=null){
						let sum=0
						uni.map(l=>{
							for(let i=0;i<=l['new'].length-1;i++){
								if(l['new'].length !=0){
									sum+=l['new'][i]
								}
							}
							l['new']=sum
							sum=0
						})
						wg=uni.sort((x,y)=>{
							return x.time-y.time
						})
						k=true;
						clearInterval(supertest)
										

					}else{k=false}							
				})

			setTimeout(()=>{
				if(k==true){
					resp.writeHead(200,k)
					resp.status(200).json({'status':'OK','message':'Success','data':[testArr[0],h,testArr[1],testArr[2],testArr[3],testArr[4],wg]})
				}
				else{
					resp.status(500).json({'status':'OK','message':'Something is Wrong with our server'})
					return
				}
			},2500)})
		}
	})
})

process.once('SIGUSR2', 
  function () { 
    process.kill(process.pid, 'SIGUSR2'); 
  }
);

const port =  process.env.port || 3000
app.listen(port,()=>{
	console.log("Server is running...")
})

const setheaders={
	'Access-Control-Allow-Origin':'*',
	'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
	'Access-Control-Allow-Headers':'Content-Type,Authorization,authorization,email,ticket_number,location',
	'Access-Control-Max-Age':259200,
	'Cache-Control':'no-cache must-revalidate'
}
