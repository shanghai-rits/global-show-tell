// src/myPageEntry.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './components/Navbar/Navbar';
import './opencall.css';

const container = document.getElementById('root');
if (!container) {
  console.error('No container found to mount the React component!');
} else {
  const root = createRoot(container);
  root.render(<Navbar />);
}

