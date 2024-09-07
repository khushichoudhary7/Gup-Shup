import React, { useEffect, useState } from 'react'
import "./Home.css"
import { Link, useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';

export default function Home() {

  const notifyA=(msg)=>toast.error(msg)
  const notifyB=(msg)=>toast.success(msg)
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
const [comment, setcomment] = useState("");
const [show, setshow] = useState(false);
const [item, setitem] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if (!token) {
      navigate("./signup")

    }

    //fetching the post 
    fetch("http://localhost:5000/allposts", {
     
      headers: {
        // "Content-Type":"application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    }).then((res) => res.json())
      .then((result) => {
        console.log(result);
        setdata(result)})
      .catch(err => console.log(err))

  }, []);


// to show and hide comment section
const togglecomment=(posts)=>{
if(show ){
  setshow(false);
  
  console.log("hide");
}
else{
  setshow(true);
  setitem(posts)
  console.log(item);
}
};

  const likepost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then(res => res.json())
      .then((result) => {
        const newdata=data.map((posts)=>{
          if(posts._id==result._id){
            return result
          }
          else{
            return posts
          }
        })
        setdata(newdata)
        console.log(result);
      })
  }

  const unlikepost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then((result) => {
        const newdata=data.map((posts)=>{
          if(posts._id==result._id){
            return result
          }
          else{
            return posts
          }
        })
        setdata(newdata)
        console.log(result);
        console.log(result)
      })
  }

  // comment function
  const makecomment=(text,id)=>{
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        text:text,
        postId: id,
      }),
    })
      .then(res => res.json())
      .then((result) => {
        const newdata=data.map((posts)=>{
          if(posts._id==result._id){
            return result
          }
          else{
            return posts
          }
        })
        
        setdata(newdata)
        setcomment("")
        notifyB("comment posted")
        console.log(result);
      })
  };




  return (
    <div className='home'>
      {data.map((posts) => {
        return (
          <div className='card'>
            <div className='card-header'>
              <div className='card-pic'>
                <img src='https://cdn.pixabay.com/photo/2022/11/18/18/34/knit-cap-7600730_1280.jpg' alt='' />
              </div>

              <h5>
                <Link to={`/profile/${posts.postedby._id}`}>
                {posts.postedby.name}
                </Link></h5>
            </div>
            {/* card image */}
            <div className='card-image'>
              <img src={posts.photo} alt='' />
            </div>
            {/* card content */}
            <div className='card-content'>
              {
                posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)?
(<span className=" material-symbols-outlined material-symbols-outlined-red" onClick={() => { unlikepost(posts._id) }} >
                favorite
              </span>):  (<span className="material-symbols-outlined" onClick={() => { likepost(posts._id) }} >
                favorite
              </span>)
              }
            
              
              <p>{posts.likes.length} Likes</p>
              <p>{posts.body}</p>
              <p style={{fontWeight:"bold" , cursor:"pointer"}} onClick={()=>{togglecomment(posts)}}>view all comments</p>
            </div>

            {/* add comment */}
            <div className='add-comment'>
              <span className="material-symbols-outlined">mood </span>
              {/* <input type='text' placeholder="Add a comment"/> */}
              <input type='text' placeholder='Add a comment' value={comment} onChange={(e)=>{setcomment(e.target.value)}}/>
              <button className='comment' onClick={()=>{makecomment(comment,posts._id)}} >Post</button>
            </div>
          </div>
        );
      })}
      {/* show comments */}
      {
show && (
<div className="showcomment">
<div className='container'>
  <div className='postpic'>
  <img src={item.photo}/>
  </div>
  <div className='details'> 
  <div className='card-header' style={{borderBottom:"1px solid black"}}>
      <div className='card-pic'>
        <img src='https://cdn.pixabay.com/photo/2022/11/18/18/34/knit-cap-7600730_1280.jpg' alt='' />
      </div>
      <h5>{item.postedby.name}</h5>
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
      <input type='text' placeholder='Add a comment' value={comment} onChange={(e)=>{setcomment(e.target.value)}}/>
      <button className='comment' onClick={()=>{makecomment(comment,item._id)
        togglecomment()
      }} >Post</button>
    </div>

    
    </div>
</div>
<div className='close-comment' onClick={()=>{togglecomment()}}>
<span className="material-symbols-outlined  material-symbols-outlined-comment">
close
</span>
</div>
</div>
      )}
    
    </div>
  )
}
