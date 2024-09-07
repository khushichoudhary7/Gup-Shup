const express=require("express");
const app=express();
const port=5000;
const mongoose=require("mongoose");
const cors=require("cors")


app.use(cors())
require("./models/model")
require("./models/post")
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/createpost"))
app.use(require("./routes/user"))
mongoose.connect("mongodb://127.0.0.1:27017")

mongoose.connection.on("connected",()=>{
    console.log("sucessfully connected")
})

mongoose.connection.on("error",()=>{
    console.log("not  connected")
})

app.listen(port,()=>{
    console.log("server is running on port "+port)
})
