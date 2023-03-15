const mysqlhandler=require("mysql");

const connectionhandler=mysqlhandler.createConnection({
		host:'sql12.freemysqlhosting.net',
		user:'sql12602493',
		password:'MIUpwRdfRB',
		port:3306		, 
		database:"sql12602493"
			});
			
	connectionhandler.connect((err)=>{
		try{
			if(!err){
				console.log("DB connected");
			}else{
				console.log(err)
			}
		}catch(e){console.log(e)}
	});

module.exports=connectionhandler;
