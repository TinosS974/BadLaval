import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
console.log('API URL:', apiUrl);

const MatchesDisplay = () => {
  const [matches, setMatches] = useState({ court1: [], court2: [], court3: [] });

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`${apiUrl}matches/today`);
        const courtMatches = response.data.reduce((courts, match) => {
          courts[`court${match.court}`].push(match);
          return courts;
        }, { court1: [], court2: [], court3: [] });
        setMatches(courtMatches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    fetchMatches();
  }, []);

  const displayPlayer = (player) => {
    return player ? `${player.firstName} ${player.lastName}` : '';
  };

  return (
    <div className="matches-display-container">
      {Object.entries(matches).map(([court, matches]) => (
        <div key={court} className="court-column">
          <h3>{court}</h3>
          {matches.slice(0, 3).map((match, index) => (
            <div key={index} className="match-entry">
              <div>
                  {displayPlayer(match.teamOne[0])} - {displayPlayer(match.teamOne[1])} &nbsp;
                  VS &nbsp;
                  {displayPlayer(match.teamTwo[0])} - {displayPlayer(match.teamTwo[1])}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;
