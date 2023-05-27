import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './bootstrap/css/bootstrap.min.css'; // Importar os estilos do Bootstrap

const rootElement = document.getElementById('root');

// Renderizar o aplicativo no elemento root do DOM
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
