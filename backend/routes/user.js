const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
const POST=mongoose.model("POST")
const USER=mongoose.model("USER")
const requirelogin = require("../middleware/requirelogin")
 

// to get profile of specific user
router.get("/user/:id",(req,res)=>{
    USER.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
       POST.find({postedby: req.params.id})
       .populate("postedby","_id")
       .then(post=>res.json({user,post}))
       .catch(err=>console.log(err))

    })
})

// to follow user
router.put("/follow" , requirelogin,(req,res)=>{
    USER.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        USER.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{
            new:true
        }).then(result=>res.json(result))
       
    })
    .catch(err=>{return res.status(422).json({error:err})})

})


// to unfollow user
router.put("/unfollow" , requirelogin,(req,res)=>{
    USER.findByIdAndUpdate(req.body.followId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({ error :err})
        }
        USER.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.followId}
        },{
            new:true
        }).then(result=>res.json(result))
        .catch(err=>{return res.status(422).json({error:err})})

    })
})

module.exports=router;