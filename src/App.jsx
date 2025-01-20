import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Showcase from './pages/Showcase.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/opencall"
          element={<RedirectToOpenCall />}
        />
        <Route
          path="/showcase"
          element={< Showcase/>}
        />
      </Routes>
    </Router>
  );
}

export default App;

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <a href="/opencall">Open Call</a>
    </div>
  )
}

function RedirectToOpenCall() {
  React.useEffect(() => {
    window.location.href = '/opencall/index.html';
  }, []);
  return null;
}
