require('dotenv').config()
const app = require('./app')
const connectDB = require('./config/database')
const {PORT} = process.env


// Connect Database
connectDB();


//Healthcheck Route
app.get('/api/healthcheck',(req,res)=>{
    res.status(200).json({
        success: true,
        message: "Server is Responding..."
    })
})


// Start Server
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING AT PORT ${PORT}...`)
})