import React,{useEffect} from 'react';

const MainLogout=()=>{
	useEffect(()=>{
		const h=({
			method:'GET',
			headers:{'authorization':localStorage.getItem('authorization')}

		});
		async function SendLogout(){
			const w=await fetch("https://admindashboard-delta.vercel.app/logout",h)
			return await w
		}	
		SendLogout().then(p=>{
			console.log(p)
			if(p.status==204){
				localStorage.clear()
				window.location='/login'
			}
		})
	},[])
	return(
			<span>Redirecting...</span>
		);
}
export default MainLogout;