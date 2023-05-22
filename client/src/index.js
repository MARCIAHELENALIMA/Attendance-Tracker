import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
