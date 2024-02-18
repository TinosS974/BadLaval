import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/Login.css";

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}admin/login`, { email, password });
      if (response.data && response.data.message === 'Authentifié avec succès') {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/admin');
      } else {
        setError('Authentification échouée, veuillez réessayer.');
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Une erreur est survenue lors de la connexion');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Connexion Admin</h2>
        {error && <p className="login-error">{error}</p>}
        <div className="login-field">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="login-field">
          <label>Mot de passe:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="login-button">Se connecter</button>
        <button type="button" onClick={handleBack} className="back-button">Retour</button>
      </form>
    </div>
  );
};

export default Login;
