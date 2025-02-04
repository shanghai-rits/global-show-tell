import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Showcase from './pages/Showcase.tsx';
import ShowcaseDetail from './pages/ShowcaseDetail.tsx'; 

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
          element={<Showcase />}
        />
        <Route
          path="/showcase/:id"  
          element={<ShowcaseDetail />}
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
      <a href="/showcase">Showcase</a>
    </div>
  )
}

function RedirectToOpenCall() {
  React.useEffect(() => {
    window.location.href = '/opencall/index.html';
  }, []);
  return null;
}
