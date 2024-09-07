import React,{useEffect,useState} from 'react'
import "./Profile.css"
import Postdetail from './Postdetail';
export default function Profile() {
const [pic, setpic] = useState([]);
const [show, setshow] = useState(false);
const [posts, setposts] = useState([]);

const toggledetails=(posts)=>{
  if(show ){
    setshow(false);
    
    console.log("hide");
  }
  else{
    setshow(true);
    setposts(posts)
    console.log(posts);
  }
  };

  useEffect(() => {
    fetch("http://localhost:5000/myposts",{
      headers:{
        Authorization:"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then(res=>res.json())
    .then((result)=>{
      setpic(result)
      console.log(pic)
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
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className='profile-info' style={{display:"flex"}}>
            <p>40 posts</p>
            <p>400 followers</p>
            <p>400 following</p>
          
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
        {pic.map((pics)=>{
          return <img key={pics._id} src={pics.photo} 
          onClick={()=>{
            toggledetails(pics)
          }}
          className='item'/>
        })}
       </div>
{show &&     <Postdetail item={posts}
toggledetails={toggledetails}
/>}
    

    
    </div>
  )
}
