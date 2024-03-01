import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function PlayerDetails({ player: { id, name, imageUrl, breed, status, teamId, owner }, onRemove }) {
  let navigate = useNavigate(); // Hook for navigation
  const handleDelete = () => onRemove(id);
  
  // Updated to use navigate for routing
  const handleDetails = () => navigate(`/player/${id}`);

  return (
    <>
      <li>
        <div>
          <h2>{name}</h2>
          <img src={imageUrl} alt={name} style={{ width: '125px', height: '125px' }} />
          <div>Breed: {breed}</div>
          <div>Status: {status}</div>
          <div>Team ID: {teamId}</div>
          <div>Owner: {owner}</div> 
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
          <button className="details-btn" onClick={handleDetails}>See Details</button>
        </div>
      </li>
    </>
  );
}

export default PlayerDetails;
