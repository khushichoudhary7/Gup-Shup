import React,{useContext} from 'react';
import "./Navbar.css"; 
import logop from "../Img/logop.png"
import { Link } from 'react-router-dom';
import { Logincontext } from '../context/Logincontext';

export default function Navbar({login}) {
const {setmodalopen}=useContext(Logincontext)
  const loginstatus=()=>{
    const token=localStorage.getItem("jwt")
   if(login || token){
    return[
      <>
            <Link to="/profile">
            <li>Profile</li>
            </Link>
            
            <Link to="/createpost">
            <li>Create-Post</li>
            </Link>

            <Link to={""}>
            <button className='primarybtn' onClick={()=>setmodalopen(true)}> Log-Out</button>
           
            </Link>

      </>
    ]
   }
   else{
    return[
<>
            <Link to="/signup">
            <li>SignUp</li>
            </Link>
           
            <Link to="/signin">
            <li>SignIn</li>
            </Link>
</>
    ]
   }
  };


  return (
    <div className='navbar'>
        <img src={logop} alt=''/>
        <ul className='nav-menu'>
            {loginstatus()}    
        </ul>
    </div>

  )
}
