import React,{useEffect,useState} from 'react'
import signlo from '../Img/signlo.png';
import "./Signup.css";
import { Link ,useNavigate} from 'react-router-dom';
import {  toast } from 'react-toastify';

export default function Signup() {
const navigate=useNavigate()

   const [name, setname] = useState("");
   const [email, setemail] = useState("");
   const [userName, setuserName] = useState("");
   const [password, setpassword] = useState("");


   //toast function
const notifyA=(msg)=>toast.error(msg)
const notifyB=(msg)=>toast.success(msg)
var emailregex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
   const postData=()=>{
    //checking email
if(!emailregex.test(email)){
    notifyA("Invalid email")
    return;
}
else if(!passwordRegex.test(password)){
    notifyA("Invalid password -- please set correct & strong format password which include  uppercase , number , lowercase , special character with the minimum length of 8 ")
    return;
}
    fetch("http://localhost:5000/signup",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            userName:userName,
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
            navigate("/signin")
        }
        console.log(data)})
   
   }
    return (
        <div className='signUp'>
            <div className='form-container'>
                <div className='form'>
                    <img className='signuplogo' src={signlo} alt='' />
                    <p className='loginpara'>
                        Discover the joy of sharing and connecting through <br />photos and stories with GubShup..
                    </p>

                    <div>
                        <input type='email' name='email' id="email" value={email} placeholder='Email' onChange={(e)=>{setemail(e.target.value)}} />
                    </div>

                    <div>
                        <input type='text' name='name' value={name} id="name" placeholder='Full Name' onChange={(e)=>{setname(e.target.value)}}/>
                    </div>
                    <div>
                        <input type='text' name='username' value={userName } id="username" placeholder=' Username' onChange={(e)=>{setuserName(e.target.value)}} />
                    </div>

                    <div>
                        <input type='password' name='password' value={password} id="password" placeholder='password' onChange={(e)=>{setpassword(e.target.value)}}/>
                    </div>

                    <p className='loginpara' style={{fontSize:"13px " , margin:"3px 0px"}}>
                        By signing up, you agree to our Terms , <br /> privacy policy and cookies policy.
                    </p>
                    <input type='submit' id='submit-btn' value="Sign Up" onClick={()=>{postData()}} />
</div>
                <div className='form2'>
                    Already have an account ?
                    <Link to="/signin">
                   
                    <span style={{color:"blue" , cursor:"pointer"}}> Sign In</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
