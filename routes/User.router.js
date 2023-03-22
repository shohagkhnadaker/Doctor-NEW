
const express=require('express')
const { createUser, Logincontrolar, getUser, appointment, bookiniAvailibilyty, userApointmentlist } = require('../controlars/User.controlar')

const route=express.Router()


// routers
route.post("/rejister",createUser)
route.post("/login",Logincontrolar)
route.post("/get-user",getUser)
route.post("/appointment",appointment)
route.post("/booking-availibility",bookiniAvailibilyty)
route.post("/get-user-apointmet-list",userApointmentlist)




module.exports=route