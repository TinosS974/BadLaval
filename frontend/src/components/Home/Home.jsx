import React from 'react';
import HeaderBar from './HeaderBar';
import LeaderBoard from './LeaderBoard';
import MatchesDisplay from './MatchesDisplay';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToMatchesPage = () => {
    navigate('/matches'); // Assurez-vous que cette route est définie dans votre système de routage
  };
  return (
    <div>
      <HeaderBar />
      <LeaderBoard />
      <MatchesDisplay/>
      <button onClick={goToMatchesPage} className="view-matches-button">
        Voir les matchs
      </button>
    </div>
  );
};

export default Home;
