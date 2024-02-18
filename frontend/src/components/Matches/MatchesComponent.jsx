// MatchesComponent.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Matches.css'; // Assurez-vous que le chemin est correct

const apiUrl = process.env.REACT_APP_API_URL;

const MatchesComponent = () => {
  const [matches, setMatches] = useState({ court1: [], court2: [], court3: [] });

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`${apiUrl}matches/today`);
        const sortedMatches = response.data.reduce((acc, match) => {
          acc[`court${match.court}`].push(match);
          return acc;
        }, { court1: [], court2: [], court3: [] });
        setMatches(sortedMatches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="matches-container">
      {Object.entries(matches).map(([court, matches]) => (
        <div key={court} className="court-column">
          <h3>{court}</h3>
          {matches.map((match, index) => (
            <div key={index} className="match-entry">
              <span>{match.teamOne.map(player => `${player.firstName} ${player.lastName}`).join(' & ')}</span>
              <span>vs</span>
              <span>{match.teamTwo.map(player => `${player.firstName} ${player.lastName}`).join(' & ')}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatchesComponent;
