import React, { useState } from 'react';
import './SearchBox.css';

interface SearchBoxProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchQuery, onSearchChange }) => {
  const [showResults, setShowResults] = useState(false);

  const handleButtonClick = () => {
    setShowResults(true); // Show results when the button is clicked
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowResults(true); // Show results when "Enter" is pressed
    }
  };

  return (
    <div className="search-box-container">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={onSearchChange}
        onKeyPress={handleKeyPress} // Trigger results on Enter key
        className="search-box-input"
      />
      <button
        className="search-button"
        onClick={handleButtonClick} // Trigger results on button click
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      {showResults && (
        <div className="search-results">
          <p>Search results will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
