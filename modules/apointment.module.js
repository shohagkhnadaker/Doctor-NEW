const mongoose=require('mongoose')



const appointscema=mongoose.Schema({
userId:{
    type:String,
    require:true
},
doctorId:{
    type:String,
    require:true
},
doctorInfo:{
    type:Object,
    require:true
},
userInfo:{
    type:Object,
    require:true
},
date:{
    type:String,
    require:true
},
status:{
    type:String,
    require:true,
    default:"pending"
},
time:{
    type:String,
    require:true
}

},{timestamps:true})


const appointmentModule=mongoose.model('appointment',appointscema)

module.exports=appointmentModule


