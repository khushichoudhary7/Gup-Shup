import React,{useState,useContext} from 'react'
import { Logincontext } from '../context/Logincontext';
import "./Signin.css";
import {  toast } from 'react-toastify';
import logop from "../Img/logop.png"
import { Link ,useNavigate} from 'react-router-dom';


export default function Signin() {
const {setuserlogin}=useContext(Logincontext)
  const navigate=useNavigate()

  const notifyA=(msg)=>toast.error(msg)
const notifyB=(msg)=>toast.success(msg)

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  var emailregex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData=()=>{
    //checking email
if(!emailregex.test(email)){
    notifyA("Invalid email")
    return;
}

    fetch("http://localhost:5000/signin",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
           
            email:email,
            password:password

        })
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
            notifyA(data.error)
        }
        else{
            notifyB(data.message)
            console.log(data)
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("user",JSON.stringify( data.user))
            setuserlogin(true);
            navigate("/")
        }
        console.log(data)})
   
   }

  return (
    <div className='signin'>
    <div>
        <div className='loginform'>
            <img className='signinlogo' src={logop} alt=""/>
            <div>
            <input type='email' name='email' id="email" value={email} placeholder='Email' onChange={(e)=>{setemail(e.target.value)}} />
            </div>
            <div>
            <input type='password' name='password' value={password} id="password" placeholder='password' onChange={(e)=>{setpassword(e.target.value)}}/>
                 
            </div>
            <input type='submit' id='login-btn' onClick={()=>{postData()}} value="Sign In"/>
        </div>
        <div className='loginform2'>
          Don't have an account ? 
          <Link to="/signup">
          <span style={{cursor:"pointer" , color:"blue"}}>Sign Up</span>
          </Link>
        </div>
    </div>
    </div>
  )
}
