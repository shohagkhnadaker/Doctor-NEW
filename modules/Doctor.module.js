const mongoose=require('mongoose')

const doctorScema=mongoose.Schema({
userId:{type:String},

fistName:{
    type:String,
    require:[true,'Fast Name is required']
},
lastName:{
    type:String,
    require:[true,'Last name is required']

},
phone:{
    type:Number,
    require:[true,'phone number is required']
},
email:{
    type:String,
    require:[true,'Email is required']
},
website:{
    type:String,
},
website:{
    type:String,
},

address:{
    type:String,
    require:[true,'Address is required']   
},
status:{
    type:String,
    default:"pending"
},

experience:{
    type:String,
    require:[true,'experience is required']   
},
feesperconsulation:{
    type:String,
    require:[true,'feesper consulation  is required']   
},
timings:{
    type:Object,
    require:[true,'woek time is required']   
}
},{timestaps:true})

const doctorModule=mongoose.model("doctors",doctorScema)
module.exports=doctorModule