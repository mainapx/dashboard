var Imap = require('node-imap')
const utfmake=require('utf8');
const mailsend=require('nodemailer');
const statecheck=require('country-state-picker');
const tokengenerater=require('rand-token');
const BaseParser=require('base-64');
const {parse}=require('node-html-parser');
var inspect = require('util').inspect;

const sqlhandler=require('./database.js');
const userconnect='';
const passwordconnect=''
let datecounter=0;
let mailrecievetime=0;
let mailreceivedate;
const MailerTest=function(){

const regionPicker={
  'rajasthan':'north',
  'Madhya Pradesh':'central',
  'Maharashtra':'west',
  'Uttar Pradesh':'north',
  'Gujarat':'west',
  'Karnataka':'south',
  'Andhra Pradesh':'south',
  'Odisha':'east',
  'Chhattisgarh':'central',
  'Tamil Nadu':'south',
  'Telangana':'south',
  'bihar':'east',
  'West Bengal':'east',
  'Arunachal Pradesh':'north',
  'Jharkhand':'east',
  'Assam':'east',
  'Ladakh':'north',
  'imachal Pradesh':'north',
  'Uttarakhand':'north',
  'Punjab':'north',
  'Haryana':'north',
  'Jammu and Kashmir':'north',
  'Kerala':'south',
  'Meghalaya':'north',
  'Manipur':'north',
  'Mizorom':'north',
  'Nagaland':'north',
  'Tripura':'north',
  'Andaman and Nicobar Islands':'Bay of Bengal',
  'Sikkim':'north',
  'Goa':'west',
  'Delhi':'north',
  'Dadra and Nagar Haveli and Daman and Diu':'west',
  'Puducherry':'sourth',
  'Chandigarh':'north',
  'Lakshadweep':'Arabian Sea'

}
let newTimer=2;
function Sendmail(usernametosend,body,format){

    var transporter=mailsend.createTransport({
      port:1025,
      secure: false,
      service:"outlook",
      auth:{
        'user':userconnect,
        'pass':passwordconnect
      },
      "tls": {
        "rejectUnauthorized": false
      }
    });
    const options={
      from:userconnect,
      to:usernametosend,
      subject:format,
      html:body
           
    }
    transporter.sendMail(options,function(error,info){
      console.log(error)
      if(!error){
        console.log("ok")
      }
    })
  }
  function DateCal(){
    let uuw=new Date();
    let getmonthtest=new Date(uuw.getUTCFullYear(),uuw.getUTCMonth(),uuw.getUTCDate()+newTimer)
    let mmw=getmonthtest.toISOString().split("T")[0]
    return mmw
  }

  function Callit(ticketnum){

             sqlhandler.query(`SELECT count(*) from processing where isValid="1" and under_processing="1";`,(err0,results1,fields)=>{
                  const hws=JSON.parse(JSON.stringify(results1))[0]['count(*)']
                  if(hws > 4){                
                    sqlhandler.query(`UPDATE  complaint set status='Not Selected' , reason='Waiting' WHERE ticket_number='${ticket_number}';`,(err1,result2,fields)=>{
                        if(!err1){
                          console.log('updated count')
                        }
                    })
                  }
                  else{
                    sqlhandler.query(`SELECT * FROM complaint where status="Unresolved" and ticket_number not in(SELECT ticket_number from processing) limit ${4-hws};`,(errk,resk,fieldk)=>{
                        const remain=JSON.parse(JSON.stringify(resk))
                        remain.map(kw=>{
                           sqlhandler.query(`UPDATE complaint set reason='Selected',status='Processing' where ticket_number='${kw.ticket_number}';`,(err7,res7,fields)=>{
                          if(!err7){
                            const mid=tokengenerater.generate(16);
                              sqlhandler.query(`INSERT INTO processing(ticket_number,expire,isValid,under_processing,process_id)VALUES('${kw.ticket_number}','${DateCal()}','1','1','${mid}');`,(err77,result77,fields)=>{
                                console.log(err77)
                                newTimer+=1
                                sqlhandler.query(`INSERT INTO result(guide,status,process_id)VALUES((select username from admin order by rand() limit 1),'Processing','${mid}');`,(error6,result6,fields6)=>{
                                    console.log(error6)
                                  
                                })                                 
                            })
                          }

                        })
                      })
                    })
                  }
                })
                  

}

  
console.log(userconnect)
  var {simpleParser} =require('mailparser');
  var imap = new Imap({
    user: userconnect,
    password: passwordconnect,
    host: 'smtp-mail.outlook.com',
    port: 587,
    secureConnection:false,
    tls: {
      ciphers: 'SSLv3'
    },
    auth:{
      user:'nalixi7029@wwgoc.com',
      pass:'Admin@@8899'
    }
  });   
  let useraddress =''; 
  let attachment='';
  var ticket_number='';
  let querytext='';
  let attchmentname=''
  let subjecttext='';
  function openInbox(cb) {
    imap.openBox('INBOX', false, cb);
  }
   
  imap.once('ready', function() {
    var fs = require('fs'), fileStream;

  openInbox(function(err, box) {

      function runAgain(){
      imap.search([ 'UNSEEN', ['SINCE', new Date()] ], function(err, results) {
        try{
        if(results){
          var f = imap.fetch(results, { bodies:'',markSeen:true });
          var x='';
          var m='';
          var region='';
          var location='';
          var attachmentfile=''
          f.on('message', function(msg, seqno) {
            msg.on('body', function(stream, info) {
              simpleParser(stream,async (err,parsed)=>{
                const {from,subject,textAsHtml,text}=parsed
                m+=parsed.attachments[0]
               attachmentfile=BaseParser.encode(utfmake.encode(m))
               try{
                 subjecttext=subject.replace(" ","").replace("\r\n","").replace(/\'/g,'').replace(/\"/g,'');
                }catch(e){console.log(e);subjecttext='None'}
               try{
                  attchmentname=parsed.attachments[0].filename.trim().replace(" ","").replace("\r\n","")
               }catch(e){attchmentname='None'}
               querytext=text.trim().replace(" ","").replace(/\n/g,"").replace(/\+/g,"").replace(/\  +/g,'').replace(/\'/g,'').replace(/\"/g,'');
               useraddress=from.value[0].address.trim().replace(" ","").replace("\r\n","")
                let check=statecheck.getStates('in')
                let regtest=/i/g
                check.map(ks=>{
                  if(subjecttext.includes(ks.toLowerCase())||subjecttext.toString().toLowerCase().includes(ks.toString().substring(0,3).toLowerCase())){
                    location=ks
                    Object.entries(regionPicker).map(([k,g])=>{

                      if(ks.toString().toLowerCase().replace(" ","").includes(k.toString().toLowerCase().replace(" ","").substring(0,5))){
                        console.log(k)
                        region=g;
                      }
                    })
                  }
                })

                const hh1=`<div><center><h3> Unprocessable Request Please Specify State Name</h3><br>Following This Format<br><center><h3>To: solmol7878@gmail.com<br>Subject: Specify State Name For where You have Purchased Product by our Company Policies<br>message:Product Issue Mention Here between 100-200 Words </h3></center><br><br><br><br>The Response is Sended By Our Automated System Our Team Will resolved if Issue as Soon as Possible</center></div>`;
                if(location===''){
                  Sendmail(useraddress, hh1,`Product Statement Error`)
                }
               let u=subject.match(/[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}/g)
               let v=text.match(/[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}/g) 

               const hh=`<div style="background-color:white;"><center><h3> Please Provide Valid Ticket Number</h3><br>A Ticket Number has Been Sended like Invalid Detected by Our database system<br><h3> Use This Format or Check the back of Your Product</h3><center><h3>XXX-XXX-XXX-XXX</h3></center><br><br><br><br>The Response is Sended By Our Automated System Our Team Will resolved if Issue as Soon as Possible</center></div>`
               if(u){
                  ticket_number=u[0].replace(" ","").replace("\r\n","")
               }else if(v)
                  {
                    ticket_number=v[0].trim().replace(" ","").replace("\r\n","")
                }
                else{
                  // automated reponse for error send back to client
                    Sendmail(useraddress,hh,'Important >> Invalid Ticket Number')
                }

                mailreceivedate=new Date();
                mailreceivetime=new Date().getTime();
                console.log(mailreceivedate)  
                if(u||v){
                  sqlhandler.query(`INSERT INTO complaint(ticket_number,query,status,subject,useraddress,attachment,reason,receivetime,location,isNew,region)VALUES('${ticket_number}','${querytext}','Unresolved','${subjecttext}','${useraddress}','${attchmentname}','Waiting','${mailreceivetime}','${location}','True','${region}');`,(q1,q2,q3)=>{  
                    console.log("New Mail Received")
                  })
                 Callit(ticket_number)
                }
   
              
            })})})
                           
        f.once('error', function(err) {
          console.log('Fetch error: ' + err);
        });

        f.once('end', function() {
          console.log('Done fetching all messages!');
        });
     }}catch(e){}})}

   runAgain()


    })})   
        if(sqlhandler.state !='disconnected'){

    setInterval(()=>{
                 sqlhandler.query(`SELECT count(*) from processing where isValid="1" and under_processing="1";`,(err0,results1,fields)=>{
                    const hws=JSON.parse(JSON.stringify(results1))[0]['count(*)']
                    if(hws <= 4){
                          sqlhandler.query(`SELECT * FROM complaint where reason='Waiting' and ticket_number not in(SELECT ticket_number from processing) limit 1;`,(errtest,resulttest,fieldtest)=>{
                            const hmmm=JSON.parse(JSON.stringify(resulttest))
                            hmmm.map(oo=>{
                              if(hmmm.length){
                                let mid=tokengenerater.generate(16);
                               sqlhandler.query(`INSERT INTO processing(ticket_number,expire,isValid,under_processing,process_id)VALUES('${oo.ticket_number}','${DateCal()}','1','1','${mid}');`,(err9,res9,field9)=>{
                                console.log(err9)
                                  sqlhandler.query(`UPDATE complaint set reason='Selected' ,status='Processing' WHERE ticket_number='${oo.ticket_number}';`,(ep,pp,cp)=>{

                                    sqlhandler.query(`INSERT INTO result(guide,status,process_id)VALUES((SELECT useraddress from admin order by rand() limit 1),'Processing','${mid}');`,(error6,result6,fields6)=>{
                                        console.log("OK Updated Complaint")
                                  
                                      }) 

                              })                               
                                                        
                            })
                          }
                        })
                      })
                    }
                })

                 sqlhandler.query(`SELECT * from processing where isValid='1' and under_processing='1' order by rand() limit 1;`,(pl,rl,fl)=>{
                     const resolvedissuetime=JSON.parse(JSON.stringify(rl));
                        if(resolvedissuetime.length){

                        const gettime=new Date().getTime()
                            const checkexpire=resolvedissuetime[0].expire.toString().split("T")[0].split("-")
                            const hws=new Date(checkexpire[0],checkexpire[1]-1,checkexpire[2])
                            let kk =parseInt(hws.getTime())-parseInt(gettime);
                            let launghdate=gettime+Math.floor(Math.random()*kk)

                            if(hws.getTime() < new Date().getTime()){

                              sqlhandler.query(`UPDATE processing set expire='0000-00-00'; where ticket_number="${resolvedissuetime[0]['ticket_number']}";`,(u1,u2,u3)=>{
                                  if(!u1){
                                    sqlhandler.query(`UPDATE TABLE complaint set status='Expire',reason='TicketExpired' where ticket_number='${resolvedissuetime[0]["ticket_number"]}';`,(g1,g2,g3)=>{
                                      const expireMsg=`
                                        <div id='flexer'>
                                            <center>
                                              <h2>Expired<br>
                                              We are Sorry Your Ticket Has Been Expired Please Resend the ticket with format
                                              <br>
                                              <h4>Description</h4>
                                              <br>
                                                ***Ticket No:'${resolvedissuetime[0]['ticket_number']}'***
                                              <br>
                                            </center>
                                          </div>
                                      `
                                      sqlhandler.query(`SELECT useraddress from complaint where ticket_number='${resolvedissuetime[0]['ticket_number']}';`,(y1,y2,y3)=>{
                                          Sendmail(JSON.parse(JSON.stringify(y2))[0]['useraddress'],expireMsg,`Refenence No: ${tokengenerater.generate(32)}`)
                                      })
                                    })
                                  }
                              })
                            }if(new Date().getTime()-3000==launghdate){
                                console.log("Resolved 1 query")
                              try{
                              sqlhandler.query(`UPDATE complaint set status='Resolved',reason='Resolved' where ticket_number='${resolvedissuetime[0]['ticket_number']}');`,(e1,r1,f1)=>{
                                  sqlhandler.query(`UPDATE processing set isValid='0', under_processing='0' where ticket_number='${resolvedissuetime[0]['ticket_number']}';`,(h1,h2,h3)=>{
                                    console.log(h1)
                                    sqlhandler.query(`UPDATE result set status='Resolved' where process_id='${resolvedissuetime[0]['process_id']}`,(ee,rr,mm)=>{
                                      if(!mm){
                                        console.log('query Resolved')
                                        sqlhandler.query(`SELECT useraddress from complaint where ticket_number='${resolvedissuetime[0]['ticket_number']}';`,(ep,ep1,ep2)=>{


                                          const qotation=`
                                            <div id='flexer'>
                                              <center>
                                                <h2>Congratulations<br>
                                                Your Issue Has been Resolved
                                                <br>
                                                <h4>Description</h4>
                                                <br>
                                                  ***Under Viewed of Product the detection Team Detected fault occue in the regulator Part***
                                                <br>
                                              </center>
                                            </div>

                                          `
                                          console.log(JSON.parse(JSON.stringify(ep1))[0])
                                          Sendmail(JSON.parse(JSON.stringify(ep1))[0]['useraddress'],qotation,`Refenence No: ${tokengenerater.generate(32)}`)
                                        })
                                      }
                                    })
                                  })                                
                              })
                            }catch(e){console.log(e)}
                          }
                      }
                 })
                 
                 sqlhandler.query(`SELECT * FROM  complaint;`,(t1,t2,t3)=>{
                        const h=JSON.parse(JSON.stringify(t2))
                        if(h.length){
                          h.map(i=>{
                            if(i['status']=='Not Selected'&&i['reason']=='Waiting'){
                              sqlhandler.query(`UPDATE complaint set isNew='True' Where ticket_number='${i['ticket_number']}';`)
                            }else{
                              sqlhandler.query(`UPDATE complaint set isNew='False' Where ticket_number='${i['ticket_number']}';`)
                            }
                          })
                        }                              
                    })

                },3000)
    }
  imap.connect();
}
module.exports=MailerTest;
