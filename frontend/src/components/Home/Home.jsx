import React from 'react';
import HeaderBar from './HeaderBar';
import LeaderBoard from './LeaderBoard';
import MatchesDisplay from './MatchesDisplay';

const Home = () => {
  return (
    <div>
      <HeaderBar />
      <LeaderBoard />
      <MatchesDisplay/>
    </div>
  );
};

export default Home;
