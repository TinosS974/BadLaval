import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderBar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to navigate to the login page
  const handleLogin = () => {
    navigate('/login'); // Navigate to /login route
  };

  return (
    <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">My Application</h1>
      <button onClick={handleLogin} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
        Login
      </button>
      <button onClick={() => navigate('/matches')}
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
      >
        Voir les matchs
      </button>
    </div>
  );
};

export default HeaderBar;
