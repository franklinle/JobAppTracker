const Job = require('../models/jobModel')
const mongoose = require('mongoose')

// get all jobs
const getJobs = async(req, res) => {
    const jobs = await Job.find({}).sort({createdAt: -1})

    res.status(200).json(jobs)
}

// get a single job
const getJob = async (req, res) => {
    const { id} = req.params
    // Checks if mongoDB id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such job'})
    }
    
    const job = await Job.findById(id)

    if (!job) {
        return res.status(404).json({error: 'No such job'})
    }

    res.status(200).json(job)
}

// create a new job
const createJob = async (req, res) => {
    const {position, company, sets} = req.body

    let emptyFields = []

    if (!position) {
        emptyFields.push('position')
    }
    if (!company) {
        emptyFields.push('company')
    }
    if (!sets) {
        emptyFields.push('sets')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // add doc to db
    try {
        const job = await Job.create({position, company, sets})
        res.status(200).json(job)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// delete a job
const deleteJob = async (req, res) => {
    // grab id
    const { id } = req.params

    // Checks if mongoDB id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such job'})
    }

    const job = await Job.findOneAndDelete({_id: id})
    
    if (!job) {
        return res.status(400).json({error: 'No such job'})
    }

    res.status(200).json(job)
}

// update a job
const updateJob = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such job'})
    }

    const job = await Job.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!job) {
        return res.status(400).json({error: 'No such job'})
    }

    res.status(200).json(job)
}


// Exports
module.exports = {
    createJob,
    getJobs,
    getJob,
    deleteJob,
    updateJob
}