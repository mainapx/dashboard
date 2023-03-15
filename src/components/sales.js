import React,{useState,useEffect} from 'react';
import {PieHandler} from './griev.js';
import ReactDOM from 'react-dom';
import {ContextHandler} from '../container/mainAdmin.js';
import Structure from './structure.js';
import {VictoryChart,VictoryHistogram,VictoryBar,VictoryAxis,VictoryVoronoiContainer,VictoryLabel,VictoryLine,VictoryTooltip,VictoryStack} from 'victory';

function GraphToolTip(props){
	return(
			<g>
				<VictoryLabel {...props} />
				<VictoryTooltip {...props}
					flyoutWidth={150}
					text={({datum})=>`Total:${datum.y} ${datum.mylabel}`}
					flyoutStyle={{fill:'black'}}
				/>			
			</g>

		)
}

function VictoryHandler({thirdvalue}){

	const [BarAnimation,setBarAnimation]=useState({main:{duration:2000,onLoad:{duration:1000}}})
	const mainDate=new Date().toString().split(" ")
	const [getGraph,putGraph]=useState({getCheck:[],secondCheck:[]})
	useEffect(()=>{
			if(thirdvalue!=null){
				console.log(thirdvalue)
				thirdvalue.map(k=>{
					let time=new Date(parseInt(k.time)).toString().split(" ")

					putGraph(pl=>({getCheck:[...pl.getCheck,
						{x:'TotalTickets',y:k.total,mylabel:`${time[1]}-${time[2]}-${time[3]}`}],
						secondCheck:[...pl.secondCheck,{x:'NewTickets',y:k.new,mylabel:`${time[1]}-${time[2]}-${time[3]}`}]	
					}))})
							
			}
	},[thirdvalue])
			
			
	return(

		<>
			<span style={{fontWeight:"bold"}}>{"Total Inquiry"}</span>
			<br />
	         <VictoryChart domainPadding={80}

	            containerComponent={<VictoryVoronoiContainer mouseFollowTooltips responsive={true}
	            	labels={({datum})=>datum.mylabel}
			        style={{labels:{fontSize:16,fill:"white"}}}

	            	labelComponent={<GraphToolTip />}
	            />}
	            labels={({datum})=>datum.x}
	            domain={{x:[0,2]}}
	            scale={{y:'time'}}
	            >
	          <VictoryAxis
	            dependentAxis={true}	
	            tickCount={12}          	
	            style={{
	              grid: { stroke: "grey",strokeDashArray:'20,10'},tickLabels:{angle:45}
	          	}}
	          />

	          <VictoryAxis 
	          	
	          />

	    		<VictoryStack colorScale={['#6E80F0','#CA6A6D']} >
	    			{getGraph.getCheck.length?getGraph.getCheck.map(p=>{
	    				return(
						
						<VictoryBar
				            barWidth={80}
				            barRatio={50}
				           	animate={{duration:500,onLoad:{duration:500}}}
				           	data={[p]}
				           	style={{labels:{fill:"white",width:'20'},
				           	data:{fill:({datum})=>datum.x=='TotalTickets'?'#6E80F0':'#6E80F0'}}}
				          />
				          )
				         }):false}
				    {getGraph.secondCheck.length?getGraph.secondCheck.map(pww=>{
	    				return(
						
						<VictoryBar
				            barWidth={80}
				            barRatio={50}
				           	animate={{duration:500,onLoad:{duration:500}}}
				           	data={[pww]}
				           	style={{labels:{fill:"white",width:'20'},
				           	data:{fill:({datum})=>datum.x=='TotalTickets'?'#CA6A6D':'#CA6A6D'}}}
				          />
				          )
				         }):false}	    	

	    		</VictoryStack>
	    		
	    		
	        </VictoryChart>
	        
        </>
    );
  }

const Sales=()=>{
	const styleMain={display:'flex',
						border:'0px',justifyContent:'space-between'}
	const stylesCheck={'fontStyle':'Cambria',color:'#74747B'};
	const [getValue,setValue]=useState({firstValue:0,secondValue:0,thirdValue:0,regionSouth:[],regionNorth:[],regionWest:[],regionEast:[],graphData:null});
	const [getProcessing,setProcessing]=useState({east:0,west:0,north:0,south:0})
	const [getProcessingw,setProcessingw]=useState({eastwvalue:0,westwvalue:0,northwvalue:0,southwvalue:0})
	const [getProcessingn,setProcessingn]=useState({eastnvalue:0,westnvalue:0,northnvalue:0,southnvalue:0})

	const [getper,setper]=useState({eastper:0,westper:0,northper:0,southper:0})
	const [getperw,setperw]=useState({eastperw:0,westperw:0,northperw:0,southperw:0})
	const [getpern,setpern]=useState({eastpern:0,westpern:0,northpern:0,southpern:0})


	useEffect(()=>{

		setTimeout(()=>{
			if(getValue.regionSouth.length||getValue.regionNorth.length||getValue.regionWest.length||getValue.regionEast.length){
			setProcessing(prev=>({...prev,south:getValue.regionSouth[0]['southp'],north:getValue.regionNorth[0]['northp'],west:getValue.regionWest[0]['westp'],east:getValue.regionEast[0]['eastp']}))
				const totalstateprocessing=getValue.regionSouth[0]['southp']+getValue.regionNorth[0]['northp']+getValue.regionWest[0]['westp']+getValue.regionEast[0]['eastp']

				const south1=Math.round(getValue.regionSouth[0]['southp']/(getValue.regionSouth[0]['southp']+getValue.regionNorth[0]['northp']+getValue.regionWest[0]['westp']+getValue.regionEast[0]['eastp'])*100)
				const north1=Math.round(getValue.regionNorth[0]['northp']/(getValue.regionSouth[0]['southp']+getValue.regionNorth[0]['northp']+getValue.regionWest[0]['westp']+getValue.regionEast[0]['eastp'])*100)				
		


				const east1=Math.round(getValue.regionEast[0]['eastp']/(getValue.regionSouth[0]['southp']+getValue.regionNorth[0]['northp']+getValue.regionWest[0]['westp']+getValue.regionEast[0]['eastp'])*100)
				const west1=Math.round(getValue.regionWest[0]['westp']/(getValue.regionSouth[0]['southp']+getValue.regionNorth[0]['northp']+getValue.regionWest[0]['westp']+getValue.regionEast[0]['eastp'])*100)

				setper(previous=>({...previous,eastper:east1,northper:north1,southper:south1,westper:west1}))
				
			setProcessingn(p1=>({...p1,southnvalue:getValue.regionSouth[0]['southnew'],northnvalue:getValue.regionNorth[0]['northnew'],westnvalue:getValue.regionWest[0]['westnew'],eastnvalue:getValue.regionEast[0]['eastnew']}))

				const south1new=Math.round(getValue.regionSouth[0]['southnew']/(getValue.regionSouth[0]['southnew']+getValue.regionNorth[0]['northnew']+getValue.regionWest[0]['westnew']+getValue.regionEast[0]['eastnew'])*100)
				const north1new=Math.round(getValue.regionNorth[0]['northnew']/(getValue.regionSouth[0]['southnew']+getValue.regionNorth[0]['northnew']+getValue.regionWest[0]['westnew']+getValue.regionEast[0]['eastnew'])*100)				
				const east1new=Math.round(getValue.regionEast[0]['eastnew']/(getValue.regionSouth[0]['southnew']+getValue.regionNorth[0]['northnew']+getValue.regionWest[0]['westnew']+getValue.regionEast[0]['eastnew'])*100)
				const west1new=Math.round(getValue.regionWest[0]['westnew']/(getValue.regionSouth[0]['southnew']+getValue.regionNorth[0]['northnew']+getValue.regionWest[0]['westnew']+getValue.regionEast[0]['eastnew'])*100)
				

				setpern(prev1=>({...prev1,eastpern:east1new,northpern:north1new,southpern:south1new,westpern:west1new}))

			setProcessingw(p2=>({...p2,southwvalue:getValue.regionSouth[0]['southw'],northwvalue:getValue.regionNorth[0]['northw'],westwvalue:getValue.regionWest[0]['westw'],eastwvalue:getValue.regionEast[0]['eastw']}))

				const southwait=Math.round(getValue.regionSouth[0]['southw']/(getValue.regionSouth[0]['southw']+getValue.regionNorth[0]['northw']+getValue.regionWest[0]['westw']+getValue.regionEast[0]['eastw'])*100)
				const northwait=Math.round(getValue.regionNorth[0]['northw']/(getValue.regionSouth[0]['southw']+getValue.regionNorth[0]['northw']+getValue.regionWest[0]['westw']+getValue.regionEast[0]['eastw'])*100)			
				const eastwait=Math.round(getValue.regionEast[0]['eastw']/(getValue.regionSouth[0]['southw']+getValue.regionNorth[0]['northw']+getValue.regionWest[0]['westw']+getValue.regionEast[0]['eastw'])*100)
				const westwait=Math.round(getValue.regionWest[0]['westw']/(getValue.regionSouth[0]['southw']+getValue.regionNorth[0]['northw']+getValue.regionWest[0]['westw']+getValue.regionEast[0]['eastw'])*100)
				setperw(prev2=>({...prev2,eastperw:eastwait,northperw:northwait,southperw:southwait,westperw:westwait}))

			}
		},1000)
	},[getValue])
	return(
				<React.Fragment>
					<ContextHandler.Consumer>{data=>{
						setTimeout(()=>{
							data==null?console.log('OK'):(
							setValue(pres=>({...pres,secondValue:data[0],thirdValue:data[1],regionSouth:[data[2]],
								regionNorth:[data[3]],regionWest:[data[5]],regionEast:[data[4]],graphData:data[6]})))
						},500)
					}}
					</ContextHandler.Consumer>
					<Structure MainData={
							<>
							<div id="product_inquery" >
								<h5 style={stylesCheck}>{"PRODUCT INQUERY"}</h5>
								<br />
							</div>
							<div id="max_inquery" >
								<h5 style={stylesCheck}>{"MAX INQUERY (REGION-WISE"}</h5>
							</div>
							<div id="delear">
								<h5 style={stylesCheck}>{"DEALER (REGION WISE)"}</h5>
							</div>
							</>
						}
							
							FooterDataFirst={<VictoryHandler
								thirdvalue={getValue.graphData}
								 />}
							
							FooterDataSecond={<PieHandler 
								Name={"Regionwise Processing Inquiry"}
								first={"#3752F8"}
								second={"#F3B519"}
								startvalue={0}
								flyout={100}
								font={13}
								endvalue={450}
								third={"green"}
								fourth={"#F14927"}
								data={[{x:`${getper.northper}%`,y:getProcessing.north,my:`North Processing: ${getper.northper}% (2021)`},{x:`${getper.eastper}%`,y:getProcessing.east,my:`East Processing: ${getper.eastper}% (2021)`},{
									x:`${getper.westper}%`,y:getProcessing.west,my:`West Processing: ${getper.westper}% (2021)`},{x:`${getper.southper}%`,y:getProcessing.south,my:`South Processing: ${getper.southper}% (2021)`}

								]}

								/>}

							FooterDataThird={<PieHandler 
								Name={"Regionwise Waiting Inquiry"}
								first={"#3752F8"}
								flyout={100}
								font={13}
								startvalue={0}
								endvalue={450}
								second={"#F3B519"}
								third={"green"}
								fourth={"#F14927"}
								data={[{x:`${getperw.northperw}%`,y:getProcessingw.northwvalue,my:`North Waiting: ${getperw.northperw}% (2021)`},{x:`${getperw.eastperw}%`,y:getProcessingw.eastwvalue,my:`East Waiting: ${getperw.northperw}% (2021)`},{
									x:`${getperw.westperw}%`,y:getProcessingw.westwvalue,my:`West Waiting: ${getperw.westperw}% (2021)`},{x:`${getperw.southperw}%`,y:getProcessingw.southwvalue,my:`South Waiting: ${getperw.southperw}% (2021)`}

								]}
								/>}

							title={'Sales'}
							saleStyle={styleMain}
						/>
					</React.Fragment>

		);
}
export default Sales;