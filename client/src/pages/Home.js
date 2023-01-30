import {useEffect, useState} from 'react'
import JobDetails from '../components/JobDetails'
import JobForm from "../components/JobForm"


const Home = () => {
    const [jobs, setJobs] = useState(null)

    //fires function when component is rendered
    useEffect(() => {
        const fetchJobs = async () => {
            const response = await fetch('/api/jobs')
            const json = await response.json()

            if (response.ok) {
                setJobs(json)
            }
        }

        fetchJobs()

    }, []) //array allows to fire only once

    return (
        <div className="home">
          <div className="jobs">
            {jobs && jobs.map(job => (
              <JobDetails job={job} key={job._id} />
            ))}
          </div>
          <JobForm />
        </div>
      )
    }

export default Home;