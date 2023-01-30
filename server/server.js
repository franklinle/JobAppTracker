require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")

const JobsRoutes = require('./routes/jobs')

// Express App
const app = express()

//Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.use('/api/jobs', JobsRoutes) //using specific route for the specific url route


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('listening on port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})