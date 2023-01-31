import { useState } from 'react'
import { useJobsContext } from '../hooks/UseJobsContext'


const JobForm = () => {
  const { dispatch } = useJobsContext()

  const [title, setTitle] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const job = {title, sets, reps}
    
    const response = await fetch('/api/jobs', {
      method: 'POST',
      body: JSON.stringify(job),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setSets('')
      setReps('')
      setEmptyFields([])
      dispatch({type: 'CREATE_JOB', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Job</h3>

      <label>Excersize Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Sets (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setSets(e.target.value)} 
        value={sets}
        className={emptyFields.includes('sets') ? 'error' : ''}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps} 
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Job</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default JobForm