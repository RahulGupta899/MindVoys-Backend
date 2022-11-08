const express = require('express')
const cors = require('cors')
const app = express();

//////////////////////////
// Middlewares
/////////////////////////
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin: "*"}))


//////////////////////
// Routers
/////////////////////
const transcriptionRoute = require('./router/transcriptionRoute')
const tagRoute = require('./router/tagRoute')
const campaignRoute = require('./router/campaignRoute')
const scorecardRoute = require('./router/scorecardRoute')


//////////////////////////
// Router Middleware
//////////////////////////
app.use('/api',transcriptionRoute)
app.use('/api',tagRoute)
app.use('/api',campaignRoute)
app.use('/api',scorecardRoute)


module.exports = app