import React from 'react';
import "./Model.css";
import { RiCloseLine } from "react-icons/ri"
import { Link, useNavigate } from 'react-router-dom';

export default function Modal({setmodalopen}) {
    const navigate = useNavigate();
  return (
    <div className='darkBg' onClick={()=>setmodalopen(false)}>
<div className='centered'>
 <div className='modal'>
        {/* modal header */}
        <div className='modalheader'>
            <h5 className='heading'>Confirm</h5>
        </div>
        <button className='closebtn' onClick={()=>setmodalopen(false)}>
            <RiCloseLine></RiCloseLine>
        </button>
        {/* modal content */}
        <div className='modalcontent'>
            Are you really want to log out ?
        </div>
        <div className='modalactions'>
            <div className='actionContainer'>
                <button className='logoutbtn' onClick={()=>{
                   setmodalopen(false)
                    localStorage.clear()
                    navigate("./signin")
                }}>Log Out</button>
                <button className='cancelbtn' onClick={()=>setmodalopen(false)}>Cancel</button>
            </div>

        </div>
    </div>
    </div>
    </div>
    
   
  )
}
