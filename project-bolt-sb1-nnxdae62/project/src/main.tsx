import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importez Routes et Route
import App from './App';
import SignUp from './components/SignUp'; // Importez le composant SignUp

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes> {/* Utilisez Routes pour définir les routes */}
        <Route path="/*" element={<App />} /> {/* Route par défaut pour le composant App */}
        <Route path="/register" element={<SignUp />} /> {/* Nouvelle route pour SignUp */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
