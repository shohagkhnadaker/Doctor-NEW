const doctorModule=require('../modules/Doctor.module')
const userModel=require ('../modules/User.module')
const apintmentModel=require ('../modules/apointment.module')
const appointmentModule = require('../modules/apointment.module')
const moment =require('moment')

const addDoctor=async(req,res)=>{
try {
const Doctor=await new doctorModule(req.body)
await Doctor.save()

const Adminuser=await userModel.findOne({isAdmin:true})
const notification=Adminuser.notification
notification.push({
    type:"apply doctor requeist",
    message:`${Doctor.fistName} ${Doctor.lastName} has applyied for a doctor account`,
    data:{
        doctorId:Doctor._id,
        doctorName:Doctor.fistName + " " +Doctor.lastName,
        onClickpath:"/admin/doctor"
    }
})

await userModel.findByIdAndUpdate(Adminuser._id,{notification})
res.status(200).send({
    success:true,
    message:"applyed Doctor Sucsess"
})

} catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: `Doctor add controler ${error.message}`   })
}


}

const sendNotification=async(req,res)=>{

try {

    const user=await userModel.findOne({_id:req.body.userId})
    console.log(user,'222');
    const seennotification=user.seennotification;
    const notification=user.notification

    seennotification.push(...notification);
user.notification = [];
// user.seennotification=notification;
const updeteUser=await user.save();

// user.password=undefined
res.status(200).send({
    success:true,
    message:"notification moved to seen",
data:updeteUser
})


    
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'notification send problem'
    })
    
}

}


// delete notification
const deleteNotification=async(req,res)=>{

    try {
    
        const user=await userModel.findOne({_id:req.body.userId})

        const seennotification=user.seennotification;
        const notification=user.notification
    
    user.notification = [];
    user.seennotification= [];
await user.save();
    
    res.status(200).send({
        success:true,
        message:"notification dalete",
    })
    
    
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'notification deleted'
        })
        
    }
    
    }
    
// get profaile doctor
const getaLLdoctor=async(req,res)=>{
try {
    const doctor=await doctorModule.findOne({userId:req.body.userId})
if (!doctor) {
    
   return res.status(200).send({
        success:true,
        message:"get  profaile failed",
    })
}
    res.status(200).send({
        success:true,
        message:"get  profaile succsess",
        data:doctor
    })

} catch (error) {
res.status(500).send({
    message:"somethin wrong",
    success:false
})

    
}


}
//update profaile
const updeteProfail=async(req,res)=>{
    try {
    const doctor=await doctorModule.findOneAndUpdate({userId:req.body.userId},req.body)    
    res.status(200).send({
        success:true,
        message:"profile Updete successfull",
        data:doctor
    })
    } catch (error) {
    res.status(500).send({
        message:"somethin wrong",
        success:false
    })
    
        
    }
    
    
    }
    
//get all Doctor
const getDoctor=async(req,res)=>{
    try {
        const doctor=await doctorModule.find({status:"approved"})
        
   res.status(200).send({
    success:true,
    message:"get all Doctor Sucsess",
    data:doctor
   })
    
    } catch (error) {
        console.log(error);
    res.status(500).send({
        message:"somethin wrong",
        success:false
    })
    
        
    }
    }

const getSingeleDoctorAppointment=async(req,res)=>{
    try {
        
const doctor= await doctorModule.findOne({_id:req.body.doctorId})
res.status(200).send({
    success:true,
    message:"doctor get success",
    data:doctor
})


    } catch (error) {
        res.status(500).send({
            message:"somethin wrong",
            success:false
            
        }) 
    }
}

const getDoctorAppointmentlist=async(req,res)=>{
    try {
        
const doctorid=await doctorModule.findOne({userId:req.body.userId})

const doctorapointment=await appointmentModule.find({doctorId:doctorid._id})

res.status(200).send({
    success:true,
    message:"Doctor apoinment list get success",
    data:doctorapointment
})

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"somethin wrong",
            success:false
        }) 
    }
}

const changeApoinmentStasus=async(req,res)=>{
    try {
const {apointId,status}=req.body;
const apointe=await appointmentModule.findByIdAndUpdate(apointId,{status})
const user=await userModel.findOne({_id:apointe.userId})
        
const notification=user.notification
notification.push({
type:'apoinment request are accepted',
message:`D.r ${apointe.doctorInfo.fistName}
 ${ apointe.doctorInfo.lastName}  ${status} on ${moment(apointe.date,"DD-MM-YYYY")} at ${moment(apointe.time,"HH:mm")} `

})
await user.save()

res.status(200).send({
success:true,
message:"apointment status change Success"
})

    } catch (error) {
        res.status(500).send({
            message:"somethin wrong",
            success:false
        }) 
    }
}

module.exports={
    addDoctor,
    sendNotification,
    deleteNotification,
    getaLLdoctor,
    updeteProfail,
    getDoctorAppointmentlist,
    getDoctor,
    getSingeleDoctorAppointment,
    changeApoinmentStasus
}