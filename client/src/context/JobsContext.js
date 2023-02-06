import { createContext, useReducer } from 'react'
import React from 'react';


export const JobsContext = createContext()

// reducer takes in a current state and an action, and returns a new
// state based on the type of the action.

export const jobsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_JOBS':
      return { 
        jobs: action.payload 
      }
    case 'CREATE_JOB':
      return { 
        jobs: [action.payload, ...state.jobs] 
      }
    case 'DELETE_JOB':
      return {
        jobs: state.jobs.filter((j) => j._id !== action.payload._id)
      }
    
      default:
      return state
  }
}


// children components represent App that's wrapped in the index.js file
export const JobsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobsReducer, { 
    jobs: null
  })
  
  return (
    <JobsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </JobsContext.Provider>
  )
}