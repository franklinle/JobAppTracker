import { useJobsContext } from "../hooks/UseJobsContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const JobDetails = ({ job }) => {
    const { dispatch } = useJobsContext()

    const handleClick = async () => {
        // append ID to the endpoint
        const response = await fetch('/api/jobs/' + job._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_JOB', payload: json})
        }
    }

    return (
      <div className="job-details">
        <h4>{job.title}</h4>
        <p><strong>Load (kg): </strong>{job.sets}</p>
        <p><strong>Number of reps: </strong>{job.reps}</p>
        <p>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</p>
        <span onClick={handleClick}>Delete</span>
      </div>
    )
  }
  
  export default JobDetails