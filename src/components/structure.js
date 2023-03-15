import React from 'react';
import './structure.css';

const Structure=(props)=>{
	return(
			<React.Fragment>
				<div className="container" id="main_containercard">
					<div className="card" style={{boxShadow:'0px 0px 2px 2px #9B9B9F',width:'1200px',position:'relative',right:'110px'}} id="structure">
						<div className="card-header" style={{backgroundColor:'#DADCE0'}}>
							<center><h7>{props.title}</h7></center>
						</div>
						<div className="card-body" style={props.saleStyle}>{
							props.MainData
						}
						
						</div>
						<div className="card-footer" style={{border:'0px',paddingLeft:'0',backgroundColor:'transparent',display:'flex',textAlign:'left'}}>
							<div className="card" style={{border:0}}>
								<div className="card-body" style={{border:0,display:props.flexStyle,textAlign:'left'}}>
									{props.FooterDataFirst}
									{props.ToolTip}
								</div>
							</div>
							<div className="card" style={{border:0}}>
								<div className="card-body" style={{border:0}}>
									{props.TitleName}
									{props.FooterDataSecond}
								</div>
							</div>
							<div className="card" style={{border:0}}>
								<div className="card-body" style={{border:0}}>
									{props.FooterDataThird}
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);	
}
export default Structure;