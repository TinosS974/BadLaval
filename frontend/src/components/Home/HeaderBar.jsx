import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderBar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl md:text-2xl font-bold">Ligue de Badminton Ulaval</h1>
      <div className="flex space-x-4">
        <button onClick={handleLogin} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          Login
        </button>
        <button onClick={() => navigate('/matches')}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Voir les matchs
        </button>
      </div>
    </div>
  );
};

export default HeaderBar;
