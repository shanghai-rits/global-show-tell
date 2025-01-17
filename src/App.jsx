import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Showcase from './pages/Showcase.tsx';

function App() {

  return (
    <Router basename="/global-show-tell">
      <Routes>
      <Route path="/*" element={<Showcase />} />
        <Route path="/showcase" element={<Showcase />} />
      </Routes>
    </Router>
  );
}

export default App;