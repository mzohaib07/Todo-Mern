import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './app';

const el = document.getElementById('app');
// @ts-ignore
const root = createRoot(el);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
