const express=require("express")
const colors =require ('colors')
const morgan=require("morgan")
require ("dotenv").config()
const cors=require('cors')
const app=express()
const passport=require('passport')
const path=require('path')
// middelware
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(morgan("dev"))
 app.use(cors())
app.use(passport.initialize())

require('./config/passport')



//Routers
const userRoute=require("./routes/User.router")
const DoctorRouter =require ('./routes/doctor.router')
const adminRouter=require ('./routes/admin.router')


app.use(express.static(path.join(__dirname,'./client/buid')))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})



//routes
app.use('/user',userRoute)
app.use('/doctor',DoctorRouter)
app.use('/admin',adminRouter)
//authntication
app.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
return res.status(200).send({
    success:true,
    user:{
        id:req.user._id,
        username:req.user.name,
        isAdmin:req.user.isAdmin,

    }
})

    }
);



module.exports=app;