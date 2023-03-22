const express=require('express')
const { getAlldoctors, getAlluser ,changeDoctorstatus} = require('../controlars/admin.controlar')
const router=express.Router()



router.get("/get-all-users",getAlluser)
router.get("/get-all-doctors",getAlldoctors)
router.post("/changeDoctorstatus",changeDoctorstatus)
module.exports=router
