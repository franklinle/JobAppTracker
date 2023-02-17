// mongoose allows us to create models/schemas for our database
// MongoDB is schemaless
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Structure of data
const jobSchema = new Schema({
    position: {
        type: String,
        required: true
    },
    company: {
        type: String, 
        required: true
    },
    status: {
        type: String, 
        required: true
    }
}, {timestamps: true}) //logs when the doc was created and last updated

// creates a job collection as we pass in the schema
module.exports = mongoose.model('jobModel', jobSchema)
