const userModule=require('../modules/User.module')
const doctorModule=require('../modules/Doctor.module')


const getAlluser=async(req,res)=>{
    try {
        const users=await userModule.find({})

        res.status(200).send({
            success:true,
            message:"get user successfull",
            data:users
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'something wrong'
        })
    }
}
const getAlldoctors=async(req,res)=>{
    try {
        
        const doctors=await doctorModule.find({})
        res.status(200).send({
            success:true,
            message:"get doctor successfull",
            data:doctors
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'something wrong'
        })
    }
}


//change Doctor status
const changeDoctorstatus=async(req,res)=>{
try {
const {doctorId,status}=req.body

const doctor=await doctorModule.findByIdAndUpdate(doctorId,{status})

const user=await userModule.findOne({_id:doctor.userId})
const notification=user.notification

notification.push({
    type:"doctor status approved",
    message:`your Doctor requirst has ${status}`,
    onClickpath:'/notification'
})
user.isDoctor=true;
await user.save();

res.status(200).send({
    success:true,
    message:"doctor Status successfully approved",
    data:doctor
})
    
} catch (error) {
    console.log(error);
    res.status(500).send({
        message:"somthing problem"
    })
}
}
module.exports={getAlldoctors,getAlluser,changeDoctorstatus}