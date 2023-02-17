import { useJobsContext } from "../hooks/UseJobsContext";
import React, { useState, useEffect, useRef } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const JobDetails = ({ job }) => {
  const { dispatch } = useJobsContext();

  const [isEditing, setIsEditing] = useState(false);
  const [position, setPosition] = useState(job.position);
  const [company, setCompany] = useState(job.company);
  const [status, setStatus] = useState(job.status);

  const containerRef = useRef(null);

  const handleDelete = async () => {
    const response = await fetch('/api/jobs/' + job._id, {
      method: 'DELETE',
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_JOB', payload: json });
    }
  };

  const handleEdit = async () => {
    const response = await fetch('/api/jobs/' + job._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        position,
        company,
        status,
      }),
    });
    const json = await response.json();
  
    if (response.ok) {
      dispatch({ type: 'EDIT_JOB', payload: json });
      setIsEditing(false);
    }
  };
  

  const handleResetEdit = () => {
    setPosition(job.position);
    setCompany(job.company);
    setStatus(job.status);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        handleResetEdit();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div className="job-details" ref={containerRef} onClick={handleEditClick}>
      {isEditing ? (
        <form>
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={position}
            onChange={handlePositionChange}
          />
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={company}
            onChange={handleCompanyChange}
          />
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={status}
            onChange={handleStatusChange}
          />
          <button type="button" onClick={handleEdit}>
            Update
          </button>
          <button type="button" onClick={handleResetEdit}>
            Reset
          </button>
        </form>
      ) : (
        <>
          <h4>{job.position}</h4>
          <p>
            <strong>Company: </strong>

            {job.company}
          </p>
          <p>
            <strong>Status: </strong>
            {job.status}
          </p>
          <p>
            {formatDistanceToNow(new Date(job.createdAt), {
              addSuffix: true,
            })}
          </p>
        </>
      )}
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default JobDetails;
