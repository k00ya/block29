import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlayerCard from './component/PlayerCard';
import AddPlayerForm from './component/AddPlayerForm';
import PlayerDetailsPage from './component/PlayerDetailsPage';
import './App.css';

// Constants for API interactions
const TEAM_NAME = '2308-ACC-PT-WEB-PT-B';
const BASE_API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${TEAM_NAME}`;

function PuppyBowlApp() {
  const [teamRoster, updateTeamRoster] = useState([]);
  const [filterText, setFilterText] = useState('');

  const fetchTeamRoster = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/players`);
      if (!response.ok) throw new Error("Couldn't load the team roster.");
      const players = await response.json();
      updateTeamRoster(players.data.players);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchTeamRoster();
  }, []);

  const searchFilteredRoster = teamRoster.filter(player =>
    player.name.toLowerCase().includes(filterText.toLowerCase())
  );

  async function handlePlayerAddition(newPlayer) {
    try {
      await fetch(`${BASE_API_URL}/players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlayer),
      });
      fetchTeamRoster();
    } catch (error) {
      console.error('Add player error:', error);
    }
  }

  async function handlePlayerRemoval(playerId) {
    try {
      await fetch(`${BASE_API_URL}/players/${playerId}`, { method: 'DELETE' });
      updateTeamRoster(currentRoster => currentRoster.filter(player => player.id !== playerId));
    } catch (error) {
      console.error('Remove player error:', error);
    }
  }

  return (
    <BrowserRouter>
      <div className="PuppyBowlApp">
        <Routes>
          <Route path="/" element={
            <>
              <header>
                <input
                  type="text"
                  placeholder="Search players..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
                <AddPlayerForm onAddPlayer={handlePlayerAddition} />
              </header>
              <main>
                {searchFilteredRoster.length > 0 ? (
                  <ul>
                    {searchFilteredRoster.map(player => (
                      <PlayerCard
                        key={player.id}
                        player={player}
                        onRemove={handlePlayerRemoval}
                      />
                    ))}
                  </ul>
                ) : (
                  <p>No players found.</p>
                )}
              </main>
            </>
          }/>
          <Route path="/player/:id" element={<PlayerDetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default PuppyBowlApp;
