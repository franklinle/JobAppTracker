const express = require('express')
const Job = require('../models/jobModel')
const {
    createJob,
    getJobs_recent,
    getJobs_latest,
    deleteJob,
    updateJob
} = require('../controllers/jobController')

const router = express.Router()

//get newest to oldest jobs
router.get('/', getJobs_recent)

//oldest to newest
router.get('/', getJobs_latest)


//get a single job
// router.get('/:id', getJob)

//POST a new job
router.post('/', createJob)

//DELETE a new job
router.delete('/:id', deleteJob)

//UPDATE a new job 
router.patch('/:id', updateJob)

module.exports = router