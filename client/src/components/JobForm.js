import { useState } from 'react'
import { useJobsContext } from '../hooks/UseJobsContext'
import React from 'react';



const JobForm = () => {
  const { dispatch } = useJobsContext()

  const [company, setCompany] = useState('')
  const [sets, setSets] = useState('')
  const [position, setPosition] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const job = {company, sets, position}
    
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
      setCompany('')
      setSets('')
      setPosition('')
      setEmptyFields([])
      dispatch({type: 'CREATE_JOB', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Job</h3>

      <label>Position:</label>
      <input 
        type="text" 
        onChange={(e) => setCompany(e.target.value)} 
        value={company}
        className={emptyFields.includes('company') ? 'error' : ''}
      />

      <label>Company</label>
      <input 
        type="text" 
        onChange={(e) => setSets(e.target.value)} 
        value={sets}
        className={emptyFields.includes('sets') ? 'error' : ''}
      />

      <label>Number of Position:</label>
      <input 
        type="text" 
        onChange={(e) => setPosition(e.target.value)} 
        value={position} 
        className={emptyFields.includes('position') ? 'error' : ''}
      />

      <button>Add Job</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default JobForm