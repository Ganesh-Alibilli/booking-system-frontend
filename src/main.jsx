import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Main from "./pages/Main";
import './index.css'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Main/>
  </React.StrictMode>
);
