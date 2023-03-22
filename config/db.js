require("dotenv").config()
const mongoose=require('mongoose')

const db=process.env.URL_DB;
const connectDB=async()=>{

    try {
mongoose.connect(db).then(()=>{
console.log("Database is connencted");
}).catch(()=>{
console.log('database problem');
})
    } catch (error) {
        console.log(error);
    }
}

module.exports=connectDB
