import React,{useEffect,useState} from 'react'
import "./Profile.css"
import Postdetail from './Postdetail';
import { useParams } from "react-router-dom";


export default function Userprofile() {
const {userid} =useParams()
console.log(userid)
const [user, setuser] = useState("");

const [posts, setposts] = useState([]);
 

// to follow user
const followUser=(userId)=>{
  fetch("http://localhost:5000/follow",{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      Authorization:"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      followId:userId,
    })
  })
  .then((res)=>{res.json()})
  .then((data)=>{
    console.log(data)
  })
}

// to unfollow user
const unfollowUser=(userId)=>{
  fetch("http://localhost:5000/unfollow",{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      Authorization:"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      followId:userId,
    }),
  })
  .then((res)=>res.json())
  .then((data)=>{
    console.log(data)
  })
}


 useEffect(() => { 
    fetch(`http://localhost:5000/user/${userid}`,{
      headers:{
        Authorization:"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then(res=>res.json())
    .then((result)=>{
        console.log(result)
      setuser(result.user)
      setposts(result.post)
    })
  }, []);

  return (
    <div className='profile'>
      {/* profile frame */}
      <div className='profile-frame'>
        <div className='profile-pic'>
<img src='https://cdn.pixabay.com/photo/2022/11/18/18/34/knit-cap-7600730_640.jpg' alt=''/>
        </div>
        <div className='profile-data'>
          <div style={{display:"flex", alignItems:"center" , justifyContent:"space-between"}}>
          <h1>{user.name}</h1>
          <button className='followbtn' onClick={()=>{followUser(user._id)}}>Follow</button>
          </div>
         
          <div className='profile-info' style={{display:"flex"}}>
            <p>{posts.length} posts</p>
            <p>400 followers</p>
            <p>400 followin</p>
          
          </div>
         
        </div>
        
      </div>
      <p style={{display:"flex", textAlign:"left", justifyContent:"left" , margin:"10px 10px", paddingLeft:"30px"}}>Making my own way ✨<br/> Nature lover🏞🏝</p>
<hr
style={{
  width:"90%",margin:"6% auto", opacity:"0.5"
}}
/>
      {/* Gallery */}

      <div className='gallery'>
        {posts.map((pics)=>{
          return <img key={pics._id} src={pics.photo} 
        //   onClick={()=>{
        //     // toggledetails(pics)
        //   }}
          className='item'/>
        })}
       </div>
{/* {show &&     <Postdetail item={posts}
toggledetails={toggledetails}
/>} */}
    

    
    </div>
  )
}
