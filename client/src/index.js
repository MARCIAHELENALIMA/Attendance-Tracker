import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

// Renderizar o aplicativo no elemento root do DOM
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Ler o valor do elemento do DOM
const value = rootElement.innerText;

console.log(value);

reportWebVitals();
