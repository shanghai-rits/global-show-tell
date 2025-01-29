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
      <div className="search-button" onClick={handleButtonClick}>
        <svg style={{ marginLeft: "5px" }} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="19.6064453125" height="30.31402587890625" viewBox="0 0 19.6064453125 30.31402587890625" fill="none">
          <path d="M18.8269 16.8409L3.76485 30.314L0 26.9463L13.1796 15.157L0 3.3677L3.76485 0L18.8269 13.4732C19.3261 13.9198 19.6065 14.5255 19.6065 15.157C19.6065 15.7885 19.3261 16.3942 18.8269 16.8409Z" fill-rule="evenodd" fill="#EBF4A1" >
          </path>
        </svg>
      </div>

      {showResults && (
        <div className="search-results">
          <p>Search results will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
