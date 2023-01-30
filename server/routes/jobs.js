const express = require('express')
const Job = require('../models/jobModel')
const {
    createJob,
    getJob,
    getJobs,
    deleteJob,
    updateJob
} = require('../controllers/jobController')

const router = express.Router()

//get all jobs
router.get('/', getJobs)

//get a single job
router.get('/:id', getJob)

//POST a new job
router.post('/', createJob)

//DELETE a new job
router.delete('/:id', deleteJob)

//UPDATE a new job 
router.patch('/:id', updateJob)

module.exports = router