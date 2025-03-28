import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Showcase from './pages/Showcase.tsx';
import ShowcaseDetail from './pages/ShowcaseDetail.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RedirectToHomePage />} />
        <Route
          path="/opencall"
          element={<RedirectToSubmission />}
        />
        <Route
          path="/submission"
          element={<RedirectToSubmission />}
        />
        <Route
          path="/collaboration"
          element={<RedirectToCollaboration />}
        />
        <Route
          path="/calendar"
          element={<RedirectToCalendar />}
        />
        <Route
          path="/about"
          element={<RedirectToAbout />}
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
      <a href="/submission">Open Call</a>
      <a href="/showcase">Showcase</a>
    </div>
  )
}

function RedirectToSubmission() {
  React.useEffect(() => {
    window.location.href = '/src/opencall.html';
  }, []);
  return null;
}

function RedirectToCollaboration() {
  React.useEffect(() => {
    window.location.href = '/src/collaboration.html';
  }, []);
  return null;
}

function RedirectToCalendar() {
  React.useEffect(() => {
    window.location.href = '/src/calendar.html';
  }, []);
  return null;
}

function RedirectToAbout() {
  React.useEffect(() => {
    window.location.href = '/src/about.html';
  }, []);
  return null;
}

function RedirectToHomePage() {
  React.useEffect(() => {
    window.location.href = '/homepage/index.html';
  }, []);
  return null;
}
