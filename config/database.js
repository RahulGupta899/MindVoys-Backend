const mongoose = require('mongoose')
const {MONGODB_URL} = process.env


const connectDB = function(){
    mongoose.connect(MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(()=>{
            console.log("DATABASE CONNECTED SUCCESSFULLY!")
    })
    .catch((err)=>{
        console.log("DATABASE CONNECTION FAILED!");
        console.log("ERROR:",err.message)
        process.exit(1)
    })
}
module.exports = connectDB;