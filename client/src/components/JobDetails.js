const JobDetails = ({ job }) => {

    return (
      <div className="job-details">
        <h4>{job.title}</h4>
        <p><strong>Load (kg): </strong>{job.sets}</p>
        <p><strong>Number of reps: </strong>{job.reps}</p>
        <p>{job.createdAt}</p>
      </div>
    )
  }
  
  export default JobDetails