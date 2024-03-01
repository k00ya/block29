import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PlayerDetailsPage() {
  const { id } = useParams(); // Get the player ID from the URL
  const [playerDetails, setPlayerDetails] = useState(null);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2308-ACC-PT-WEB-PT-B/players/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch player details.');
        }
        const data = await response.json();
        setPlayerDetails(data.data.player); // Set player details in state
        console.log(data.data.player); // Log player details to console
      } catch (error) {
        console.error('Error fetching player details:', error);
      }
    };

    fetchPlayerDetails();
  }, [id]); // Re-fetch when ID changes

  // Display a loading message or spinner while player details are being fetched
  if (!playerDetails) {
    return <div>Loading player details...</div>;
  }

  // Display player details once fetche
  return (
    <div>
      <h2>{playerDetails.name}</h2>
      <img src={playerDetails.imageUrl} alt={playerDetails.name} style={{ width: '200px', height: '200px' }} />
      <div>Breed: {playerDetails.breed}</div>
      <div>Status: {playerDetails.status}</div>
      <div>Team ID: {playerDetails.teamId}</div>
      <div>Owner: {playerDetails.owner}</div> 
    </div>
  );
}

export default PlayerDetailsPage;
