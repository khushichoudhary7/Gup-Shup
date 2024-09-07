const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const requirelogin = require("../middleware/requirelogin");
const POST=mongoose.model("POST")

// Route
router.get("/allposts" , (req,res)=>{
    POST.find()
    .populate("postedby","_id name")
    .populate("comments.postedby" ,"_id name")
    .then(posts=>res.json(posts))
    .catch(err=>console.log(err))
})

router.post("/createpost",requirelogin,(req,res)=>{
    const {body , pic}=req.body;
    if( !body || !pic ){
        return res.status(422).json({error:"Please enter all the fields"})
    }
   req.user
   const post=new POST({
    body,
    photo:pic,  
    postedby:req.user
   })
post.save().then((result)=>{
    return res.json({post:result})
}).catch(err=>console.log(err))
})

router.get("/myposts", requirelogin ,(req,res)=>{
    POST.find({postedby:req.user._id})
    .populate("postedby","_id name")
    .populate("comments.postedby" ,"_id name")
    .then(myposts=>{
        res.json(myposts)
    })
})

router.put("/like",requirelogin,(req,res)=>{
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
     })
     .then(posts=>res.json(posts))
    .catch(err=>console.log(err))
   // .exec((err,result)=>{
    //     if(err){
    //         return res.status(422).json({error:err})
    //     }
    //     else{
    //         res.json(result)
    //     }
    // })
})

router.put("/unlike",requirelogin,(req,res)=>{
    POST.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .then(posts=>res.json(posts))
    .catch(err=>console.log(err))
    // .exec((err,result)=>{
    //     if(err){
    //         return res.status(422).json({error:err})
    //     }
    //     else{
    //         res.json(result)
    //     }
    // })
})


router.put("/comment", requirelogin,(req,res)=>{
    const comment={
        comment:req.body.text,
        postedby:req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId,{
$push:{comments:comment}
    },{
        new :true
    })
    .populate("comments.postedby","_id name")
    .populate("postedby","_id name")
.then(posts=>res.json(posts))
.catch(err=>console.log(err))
})
//API to delete the post

router.delete("/deletePost/:postId" ,requirelogin , (req,res)=>{
    POST.findOne({_id: req.params.postId})
    .populate("postedby","_id")
    // .exec((err,post)=>{
    //     console.log(post) 
    // })

    .then((post,err)=>{
        if(!post || err){
            return res.status(422).json({error:err})
        }
    //   if(post.postedby._id == req.user._id){

    //   }
  if(post.postedby._id.toString()==req.user._id.toString()){
    post.deleteOne()
    .then(result=>{
        return res.json({message: "sucesssfully deleted"})

    })
    .catch(err=>console.log(err))
  }
        
      
    })
       
    .catch(err=>console.log(err))

})
module.exports=router