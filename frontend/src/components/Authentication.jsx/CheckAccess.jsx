import React from "react";
import { Navigate } from 'react-router-dom';


const CheckAccess = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const isAdmin = localStorage.getItem('isAdmin');
    return isAuthenticated && isAdmin ? children : <Navigate to="/" />;
  };
  

export default CheckAccess;