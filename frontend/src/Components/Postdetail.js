import React from 'react'
import "./Postdetail.css"
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
export default function Postdetail({item ,toggledetails}) {
const navigate=useNavigate()
const notifyA=(msg)=>toast.error(msg)
const notifyB=(msg)=>toast.success(msg)
const removePost=(postId)=>{
  if(window.confirm("Do you really want to delete this post ? ")){

  
  console.log(postId)
  fetch(`http://localhost:5000/deletePost/${postId}`,{
    method:"delete",
    headers:{
      Authorization:"Bearer "+localStorage.getItem("jwt"),
    },
  })
  .then((res)=>res.json())
    .then ((result)=>{
      console.log(result)
      toggledetails();
      navigate("/");
      notifyB(result.message);
    })
  }
}

  return (
    <div className="showcomment">
    <div className='container'>
      <div className='postpic'>
      <img src={item.photo }/>
      </div>
      <div className='details'> 
      <div className='card-header' style={{borderBottom:"1px solid black"}}>
          <div className='card-pic'>
            <img src='https://cdn.pixabay.com/photo/2022/11/18/18/34/knit-cap-7600730_1280.jpg' alt='' />
          </div>
          <h5>{item.postedby.name}</h5>
          <div className='deletepost' onClick={()=>{removePost(item._id)}}>
          <span className="material-symbols-outlined">
delete
</span>
          </div>
        </div>
    
        {/* comment section */}
        <div className='comment-section' style={{borderBottom:"1px solid black"}}>
         
         {item.comments.map((comment)=>{
    return (<p className='comm'>
      <span className='commenter' style={{fontWeight:"bolder"}}>{comment.postedby.name}{""}</span>
      <span className='commentText'> {comment.comment}</span>
    </p>);
         })}
         
         
          
          {/* <p className='comm'>
            <span className='commenter' style={{fontWeight:"bold"}}>oyeee</span>
            <span className='commentText'>   nice</span>
          </p>
          <p className='comm'>
            <span className='commenter' style={{fontWeight:"bold"}}>oyeee</span>
            <span className='commentText'>   nice</span>
          </p> */}
        </div>
        {/* card content */}
        <div className='card-content'>
          
          <p>{item.likes.length} Likes</p>
          <p>{item.body}</p>
        </div>
    {/* add comment */}
    <div className='add-comment'>
          <span className="material-symbols-outlined">mood </span>
          {/* <input type='text' placeholder="Add a comment"/> */}
          {/* <input type='text' placeholder='Add a comment' value={comment} onChange={(e)=>{setcomment(e.target.value)}}/>
          <button className='comment' onClick={()=>{makecomment(comment,item._id)
            togglecomment()
          }} >Post</button> */}
        </div>
    
        
        </div>
    </div>
    <div className='close-comment' 
    onClick={()=>{toggledetails()}}
    >
    <span className="material-symbols-outlined  material-symbols-outlined-comment">
    close
    </span>
    </div>
    </div>
  )
}
