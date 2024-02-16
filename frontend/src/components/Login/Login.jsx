import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
console.log("process env", process.env);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Assurez-vous d'ajuster l'URL selon votre configuration
      const response = await axios.post(`${apiUrl}admin/login`, { email, password });
      // Supposons que le backend renvoie un token dans response.data.token ou un indicateur d'authentification
      if (response.data && response.data.message === 'Authentifié avec succès') {
        // Stocker le token ou un indicateur d'authentification dans localStorage
        localStorage.setItem('isAuthenticated', 'true');
        // Peut-être stocker aussi le token
        // localStorage.setItem('token', response.data.token);
        navigate('/admin'); // Rediriger vers la page d'admin
      } else {
        setError('Authentification échouée, veuillez réessayer.');
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Une erreur est survenue lors de la connexion');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Mot de passe:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;
