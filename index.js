require('dotenv').config()
const app = require('./app')
const connectDB = require('./config/database')

// Connect Database
connectDB();

// Start Server
app.listen(5000,()=>{
    console.log('SERVER IS RUNNING AT PORT 5000...')
})