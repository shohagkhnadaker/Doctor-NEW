
const express=require('express')
const { addDoctor, sendNotification, deleteNotification, getaLLdoctor, updeteProfail, getDoctor, getSingeleDoctorAppointment, getDoctorAppointmentlist, changeApoinmentStasus } = require('../controlars/Doctor.controler')

const route=express.Router()


// routers
route.post("/add-doctor",addDoctor)
route.post("/notification-seen",sendNotification)
route.post("/notification-delete",deleteNotification)
route.post("/getsingkedoctor",getaLLdoctor)
route.post("/updateprofaile",updeteProfail)
route.get("/get-doctor",getDoctor)
route.post("/get-apoint-doctor",getSingeleDoctorAppointment)
route.post("/get-doctor-apointment-list",getDoctorAppointmentlist)
route.post("/change-apoinment-status",changeApoinmentStasus)





module.exports=route