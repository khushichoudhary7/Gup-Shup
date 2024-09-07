import React,{useState,useEffect} from 'react'
import {  toast } from 'react-toastify';
import "./Createpost.css"
import { Link ,useNavigate} from 'react-router-dom';



export default function Createpost() {

  const navigate=useNavigate()
const [body, setbody] = useState("");
const [image, setimage] = useState("");
const [url, seturl] = useState("");

const notifyA=(msg)=>toast.error(msg)
const notifyB=(msg)=>toast.success(msg)


useEffect(() => {
  if(url){
     // saving post to mongodb

     fetch("http://localhost:5000/createpost",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        body,
        pic:url
      })
    }).then(res=>res.json())
    .then(data=>{if(data.error){
      notifyA(data.error)
     
    }
  else{
    notifyB("Successfully posted")
   navigate("/")
  }})
    .catch(err=>console.log(err))
  }
}, [url]);


// posting image to cloudinary
const postDetails=()=>{
  console.log(body,image)
  const data=new FormData()
  data.append("file",image)
  data.append("upload_preset","insta-clone")
  data.append("cloud_name","cloud9i")
  fetch("https://api.cloudinary.com/v1_1/cloud9i/image/upload" , {
    method:"post",
    body:data
  }).then(res=>res.json())
    .then(data=>seturl(data.url))
    .catch(err=>console.log(err))

   
}

const loadfile=(event)=>{
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
};

  return (
<div className='createpost'>
        <div className='post-header'>
            <h4 style={{margin:"10px auto"}}>Create New Post</h4>
            <button id='post-btn' onClick={()=>{postDetails()}}>Share</button>
        </div>
         {/* image preview */}
        <div className='main-div'>
            <img id='output' src='https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png'  />
        <input type='file' accept='image/*' onChange={(event)=>{
            loadfile(event);
            setimage(event.target.files[0])
        }}/>
        </div>
        {/* details */}
        <div className='details'>
        <div className='card-header'>
        <div className='card-pic'>
<img src='https://cdn.pixabay.com/photo/2022/11/18/18/34/knit-cap-7600730_640.jpg' alt=''/>
        </div>
        <h5>Siya</h5>

        </div>
        <textarea value={body} onChange={(e)=>{
          setbody(e.target.value)
        }}   type="text" placeholder='Write a caption....'></textarea>
        </div>
    </div>
  )
}
