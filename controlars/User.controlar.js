const jwt = require('jsonwebtoken')
const userModel = require('../modules/User.module')
const bcrypt = require('bcryptjs')
const appointmentModule = require('../modules/apointment.module')
const moment =require ('moment')

const createUser = async (req, res) => {

    try {
        const Existuser = await userModel.findOne({ name: req.body.name })
 if (Existuser) {
            return res.status(200).send({
                message: "user Alredy Exist..!", 
                success: false
            })
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10)
        const haspassword = await bcrypt.hash(password, salt)

        req.body.password = haspassword

        const newuser = new userModel(req.body)
        await newuser.save();
        res.status(201).send({
            success: true,
            message: "Register succsess..!"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `register controler ${error.message}`   })
    }
}

const Logincontrolar = async (req, res) => {
    try {
        const user = await userModel.findOne({name:req.body.name })
        if (!user) {
            return res.status(200).send({ success: false, message: "User not found" })
        }
        const mathUser = await bcrypt.compare(req.body.password, user.password);
        if (!mathUser) {

            return res.status(200).send({ success: false, message: "name and password wrong" })
        }
        
        const token = jwt.sign({ id: user._id}, process.env.SECRET_KEY, { expiresIn: "1h" })
        res.status(200).send({
            success: true,
            message: "Login successfully..!",
            token: 'Bearer ' + token,
            userId:user._id
        })


    } catch (error) {
        res.status(500).send({
            success: true,
            message: `login controlar ${error.message}`
        })
    }
}

const getUser = async (req,res) => {
try {
    const user=await userModel.findOne({_id:req.body.id})
user.password=undefined
if(!user) {
   return res.status(200).send({
        success:false,
        message:"user not found"
    })
}else{
    return res.status(200).send({
        success:true,
        message:'user found successfull',
        data:user
    })
    
}

} catch (error) {
   console.log(error); 
}

}



const appointment=async(req,res)=>{
try {
req.body.status='pending';
req.body.date=moment(req.body.date,'DD-MM-YYYY').toISOString();
req.body.time=moment(req.body.time,'HH:mm').toISOString();


const newappointment= new appointmentModule(req.body)
await newappointment.save()

const doctor= await userModel.findOne({_id:req.body.doctorInfo.userId})

doctor.notification.push({
    type:'appointment requiest',
    message:`A new apointment requeist from ${req.body.name}`,
    onClickpath:`/doctor-appointment-list/${doctor.userId}`
})
await doctor.save()

res.status(200).send({
    success:true,
    message:'apointment book succesfully'
})


    
} catch (error) {
 res.status(500).send({
    success:true,
    message:"somthing wrong apoientment"
 })   
}
}


const bookiniAvailibilyty=async(req,res)=>{
    try {
    const date=moment(req.body.date,'DD-MM-YYYY').toISOString();
    const fromTime=moment(req.body.time,"HH:mm").subtract(1,'hours').toISOString()
    const toTime=moment(req.body.time,"HH:mm").add(1,'hours').toISOString()

const doctor=req.body.doctorId


    const appointment=await appointmentModule.findOne({doctor,date,
        time:{$gte:fromTime,$lte:toTime}
    })

if (appointment.length> 0) {
    return res.status(200).send({
        success:false,
        message:"Doctor not availible at this time",
    })
} else {
    return res.status(200).send({
        success:true,
        message:"Doctor Availible"
    })
}

        
    } catch (error) {
     console.log(error);
     res.status(500).send({
        success:false,
        message:"somthing wrong apoientment"
     })   
    }
    }
    
    

const userApointmentlist=async(req,res)=>{
try {
const userApointment= await appointmentModule.find({userId:req.body.userId})

if (!userApointment) {
   return res.status(200).send({
        success:false,
        message:"user apointment list get not success",
    })
}
res.status(200).send({
    success:true,
    message:"user apointment list get success",
    data:userApointment
})
    
} catch (error) {
    console.log(error);
    res.status(500).send({
       success:false,
       message:"somthing wrong apoientment"
    })   
}
    }
    


module.exports = { createUser, Logincontrolar, getUser,appointment ,bookiniAvailibilyty,userApointmentlist}