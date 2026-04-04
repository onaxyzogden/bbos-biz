import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/tokens.css';
import './styles/global.css';
import { runMigrations } from './services/migration';

// Init theme from storage
const savedTheme = localStorage.getItem('bbiz_theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Run data migrations synchronously before React mounts
runMigrations();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
