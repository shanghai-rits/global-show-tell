import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Showcase from './pages/Showcase.tsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/showcase" element={<Showcase />} />
      </Routes>
    </Router>
  )
}

export default App
