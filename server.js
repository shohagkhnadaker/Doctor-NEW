require ("dotenv").config()
const connectDB = require("./config/db")

//connet database

connectDB()
const app=require('./app')

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`.bgCyan.white);
})
