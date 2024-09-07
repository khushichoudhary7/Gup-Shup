const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
const USER=mongoose.model("USER")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {jwt_secret}=require("../Keys")
const requirelogin = require("../middleware/requirelogin")
 
router.get('/',(req,res)=>{
    res.send("hello")
})

// router.get("/createpost" , requirelogin ,(req,res)=>{
//     console.log("heloo auth")

// })

router.post("/signin",(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please login with email and password "})
    }

    USER.findOne({email:email}).then((saveduser)=>{
        if(!saveduser){
            return res.status(422).json({error:"Invalid email"})
        }
       bcrypt.compare(password,saveduser.password).then((match)=>{
        if(match){
            // return res.status(200).json({message:"signed in Successfully"})
            const token=jwt.sign({_id:saveduser.id},jwt_secret)
            const {_id,name,email,userName}=saveduser
           res.json({token,user:{_id,name,email,userName}})
            console.log({token,user:{_id,name,email,userName}})
        }
        else{
            return res.status(422).json({error:"Please enter the correct password"})
        }
       })
       .catch(err=>console.log(err))
    })
})

router.post("/signup",(req,res)=>{
   const{name,userName,email,password}=req.body;
    if(!name || !email || !password  || !userName){
       return res.status(422).json({error:"please add all the fields "})
    }

    USER.findOne({$or:[{email:email},{userName:userName}]}).then((saveduser)=>{
        if(saveduser){
            return res.status(422).json({error:"User already exist with that email or same username "})
        }

        bcrypt.hash(password,12).then((hashedpassword)=>{
            const user= new USER({
                name,email,userName,password:hashedpassword
               })
            
               user.save()
               .then(user=>{res.json({message:"Registered successfully"})})
               .catch(err=>{console.log(err)})
        })
       
    })

   
})
module.exports=router