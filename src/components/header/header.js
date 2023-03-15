import React from 'react';
import './header.css';
import logoelite from './favicon.png';

class Header extends React.Component{
	constructor(){
		super()
		this.buttonStyle={border:0,outline:'none',color:'white'
		}
		this.iconStyle={color:'white',fontSize:'20px'}
	}
	render(){
		return(
				<React.Fragment>
					<div className="row">
						<div className="col-lg-12">
							<div className="navbar navbar-fixed-top" style={{
									backgroundColor:'#252D61',
									boxShadow:'0px 0px 2px 2px #9B9B9F'
								}}
								id="header_nav"
								>
								<div className="navbar-brand">
									<button type="button" style={this.buttonStyle} className="btn btn-default">
									<h4 style={{color:'white',fontStyle:'italic'}}><img  src={logoelite} style={{height:'50px',width:'50px'}}/>{"EliteSystems"}</h4>

									</button>
								</div>
								<ul className="nav" id="navflexer" style={{position:'relative'}}>
									<li className="nav-item">
										<button onClick={()=>window.location="/admin"} type="button" style={this.buttonStyle} className="btn btn-default nav-link">
											{"Home"}
											</button>
									</li>
									<li className="nav-item">
										<button onClick={()=>window.location="/edit"} type="button" style={this.buttonStyle} className="btn btn-default nav-link">
											{"Edit"}	
										</button>
									</li>
									<li className="nav-item">
										<button onClick={()=>window.location="/Database"} type="button" style={this.buttonStyle} className="btn btn-default nav-link">
											{"Settings"}
											</button>
									</li>
									<li className="nav-item">
										<button onClick={()=>window.location="/signout"} type="button" className="btn btn-default nav-link">
											<i className="fa fa-sign-out" style={this.iconStyle}></i>	
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</React.Fragment>
			);
	}

}
export default Header;