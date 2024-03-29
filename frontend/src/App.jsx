import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MatchesPage from "./pages/MatchesPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import CheckAccess from "./components/Authentication.jsx/CheckAccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/admin" element={<CheckAccess><AdminPage /></CheckAccess>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
