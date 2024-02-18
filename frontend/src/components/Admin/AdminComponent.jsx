
import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/Admin.css";

const apiUrl = process.env.REACT_APP_API_URL;

const AdminComponent = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}users`, {
        email,
        firstName,
        lastName,
        isAdmin
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Une erreur est survenue');
    }
  };

  const handleGenerateMatches = async () => {
    try {
      const response = await axios.post(`${apiUrl}matches/session`);
      setMessage('Matches pour la session générés avec succès.');
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Une erreur est survenue lors de la génération des matches');
    }
  };

  return (
    <div className="admin-container">
      <h2>Page Administrateur</h2>
      <button onClick={handleGenerateMatches} className="generate-matches-btn">Générer les matches pour la session</button>
      <form onSubmit={handleCreateUser} className="admin-form">
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prénom:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nom de famille:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Administrateur:</label>
          <select
            value={isAdmin}
            onChange={(e) => setIsAdmin(e.target.value === 'true')}
            required
          >
            <option value="false">Non</option>
            <option value="true">Oui</option>
          </select>
        </div>
        <button type="submit" className="create-user-btn">Créer un utilisateur</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AdminComponent;