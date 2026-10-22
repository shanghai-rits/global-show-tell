import React from 'react';
import './styles/detail.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import EventDetail from './pages/EventDetail.tsx';
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
          path="/events"
          element={<RedirectToEvents />}
        />
        <Route
          path="/showcase"
          element={<Showcase />}
        />
        <Route
          path="/showcase/:id"
          element={<ShowcaseDetail />}
        />
        <Route
          path="/event/:id"
          element={<EventDetail />}
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
    redirectToStaticPage('/src/opencall.html');
  }, []);
  return null;
}

function RedirectToCollaboration() {
  React.useEffect(() => {
    redirectToStaticPage('/src/collaboration.html');
  }, []);
  return null;
}

function RedirectToCalendar() {
  React.useEffect(() => {
    redirectToStaticPage('/src/calendar.html');
  }, []);
  return null;
}

function RedirectToAbout() {
  React.useEffect(() => {
    redirectToStaticPage('/src/about.html');
  }, []);
  return null;
}

function RedirectToEvents() {
  React.useEffect(() => {
    redirectToStaticPage('/src/events.html');
  }, []);
  return null;
}

function RedirectToHomePage() {
  React.useEffect(() => {
    redirectToStaticPage('/homepage/index.html');
  }, []);
  return null;
}

function redirectToStaticPage(path) {
  const { search, hash } = window.location;
  window.location.replace(`${path}${search}${hash}`);
}
