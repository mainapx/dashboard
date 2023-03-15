import React,{useState,useEffect} from 'react';
import Structure from './structure.js';
import {ContextHandler} from '../container/mainAdmin.js';
import FusionCharts from 'fusioncharts';
import moment from 'moment';
import ReactApexChart from 'react-apexcharts';
import ReactFC from 'react-fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import {VictoryPie,VictoryChart,VictoryBar,VictoryLabel,VictoryAxis,VictoryTooltip} from 'victory';
import './griev.css';

function HorizontalVictory({countervalues,mapvalues}){
		const [getState,setStateData]=useState({
   				  series: [{
              data: [
              	[new Date().getTime(),44],
              	[new Date().getTime(),44],
              	[new Date().getTime(),44]
          	]}],
            options: {
              chart: {
                type: 'bar',
                height: 350,
                stacked: true,
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                  distributed:true
                },
              },
              stroke: {
                width: 1,
                colors: ['#fff']
              },
              title: {
                text: 'Fiction Books Sales'
              },
              dataLabels:{
              	enabled:false
              },
              xaxis: {
                categories: ['South','East','West','North'],
               labels: {
   					 formatter: function (value, timestamp) {
    				  let x= new Date(timestamp).toString().split(" ")
    				  let newdate=new Date()
    				  let k=new Date(newdate.setDate(new Date().getDay()+1)).toString().split(" ")[2]
    				  return `${k}` // The formatter function overrides format property
    			 
  					}
                }
              },
              yaxis: {
                title: {
                  text: undefined
                },
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return val + "K"
                  }
                }
              },
              fill: {
                opacity: 1
              },
              legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40
              }
            },
          
          
          })

        return (
            
      <div id="chart">
		  <ReactApexChart options={getState.options} series={getState.series} type="bar" width={400} height={400} />
	</div>
    
    );

}
function MainTooltip(props){
	return(
			<g>
				<VictoryLabel {...props} />
				<VictoryTooltip {...props}
					flyoutWidth={props.flyout}
					text={({datum})=>datum.my}

					flyoutHeight={80}
					flyoutStyle={{fill:'black'}}
				/>
			</g>

	)
}
MainTooltip.defaultEvents=VictoryTooltip.defaultEvents;
function PieHandler(props){
	return(
			<>
				<div clsasName="row">
					<div className="col-lg-12">
					<span style={{fontWeight:'bold'}}>{props.Name}</span>
					
					<VictoryPie 
						style={{
							data:{fillOpacity:0.9,stroke:'white',strokeWidth:3},
							labels:{fontSize:props.font,fill:"white"}
						}}
						colorScale={[props.first,props.second,props.third,props.fourth]} 
						data={props.data}
						labelComponent={<MainTooltip />}
						startAngle={props.startvalue}
						labelRadius={80}
						endAngle={props.endvalue}	
						 />
					
					<VictoryLabel
						textAnchor="middle"
						x={200}
						y={200}
						verticalAnchor="middle"
					/>	
						</div></div>

					{props.ToolTip}
			</>
		);
}

const Griev=()=>{
	const stylesCheck={'fontStyle':'Cambria',color:'#74747B'};
	const BottomStyle={display:'flex',
						border:'0px'};
	const [getState,checkState]=useState({countervalues:null,mapvalues:null})
	const [getpieValue,setpieValue]=useState(null);
	const [getbarValue,setbarValue]=useState({southdata:null,northdata:null,westdata:null,eastdata:null});
	const [getpiedata,setpiedata]=useState({ss1:0,nn1:0,e1:0,w1:0,southp:0,northp:0,westp:0,eastp:0})

	useEffect(()=>{
		if(getpieValue != null){
		setTimeout(()=>{

			const maintotal=getpieValue.southdata['southnew']+getpieValue.northdata['northnew']+getpieValue.westdata['westnew']+getpieValue.eastdata['eastnew']
					
			const southpers=Math.round(getpieValue.southdata['southnew']/(maintotal)*100)
			const northpers=Math.round(getpieValue.northdata['northnew']/(maintotal)*100)
			const westper=Math.round(getpieValue.westdata['westnew']/(maintotal)*100)
			const eastper=Math.round(getpieValue.eastdata['eastnew']/(maintotal)*100)
			
			setpiedata(prev=>({...prev,ss1:getpieValue.northdata['northnew'],
				nn1:getpieValue.southdata['southnew'],
				w1:getpieValue.westdata['westnew'],
				e1:getpieValue.eastdata['eastnew'],
				southpp:southpers,northpp:northpers,westp:westper,eastp:eastper}))
		},2000)}
	},[getpieValue])
	return(
			<React.Fragment>
					<ContextHandler.Consumer>{data=>{
						setTimeout(()=>{
							data==null?console.log('OK'):(
								setpieValue(previous=>({...previous,southdata:data[2],
									northdata:data[3],westdata:data[5],eastdata:data[4]}))
							)
						},500)
					}}
					</ContextHandler.Consumer>
				<div id="MainContainer">
					
					<Structure title={"Grievances"} 
						MainData={
							<>
							<div className="bottom_first" style={{textAlign:'left'}}>
								<h5 style={stylesCheck}>{"REGION WISE"}</h5>
							</div>
							<div className="bottom_second" style={{flex:'1'}}>
								<h5 style={stylesCheck}>{"PRODUCT WISE"}</h5>
							</div>
							</>
						}
						saleStyle={BottomStyle}
						FooterDataFirst={<PieHandler 
								Name={"Regionwise New Tickets Inquiry"}
								first={"#3752F8"}
								flyout={100}
								font={13}
								second={"#F3B519"}
								startvalue={0}
								endvalue={450}
								third={"green"}
								fourth={"#F14927"}
									data={
										[{x:`${getpiedata.northpp}%`,y:getpiedata.ss1,my:`North Total: ${getpiedata.northpp}% (2021)`},
										{x:`${getpiedata.southpp}%`,y:getpiedata.nn1,my:`South Total: ${getpiedata.southpp}% (2021)`},
										{x:`${getpiedata.eastp}%`,y:getpiedata.e1,my:`East Total: ${getpiedata.eastp}% (2021)`},
									{x:`${getpiedata.westp}%`,y:getpiedata.w1,my:`West Total: ${getpiedata.westp}% (2021)`}
									]}
						ToolTip={<ul id="testLi">
							<li><span>{"North"}</span></li>
							<li><span>{"West"}</span></li>

							<li><span>{"South"}</span></li>
							<li><span>{"East"}</span></li></ul>}
						/>}
						FooterDataSecond={
							<HorizontalVictory countervalues={getState.countervalues}
								mapvalues={getState.mapvalues}
							/>
						}
						flexStyle={'flex'}
						TitleName={<span style={{fontWeight:'bold'}}>{"Grievances Productwise"}</span>}
						
					/>
				</div>
			</React.Fragment>
		);
}
export  {PieHandler,Griev};