const Job = require('../models/jobModel')
const mongoose = require('mongoose')

// get jobs by newest to oldest
const getJobs_recent = async(req, res) => {
    const jobs = await Job.find({}).sort({createdAt: -1})

    res.status(200).json(jobs)
}

// get jobs by newest to oldest
const getJobs_latest = async(req, res) => {
    const jobs = await Job.find({}).sort({createdAt: 1})

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
    const {position, company, status} = req.body

    let emptyFields = []

    if (!position) {
        emptyFields.push('position')
    }
    if (!company) {
        emptyFields.push('company')
    }
    if (!status) {
        emptyFields.push('status')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // add doc to db
    try {
        const job = await Job.create({position, company, status})
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
    getJobs_recent,
    getJobs_latest,
    getJob,
    deleteJob,
    updateJob
}