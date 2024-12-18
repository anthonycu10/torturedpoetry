// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const [showPaper, setShowPaper] = useState(false); // State to control paper visibility
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    const results = (item => item.toLowerCase().includes(query.toLowerCase()));

    setSearchResults(results);  // Update search results
    setShowPaper(true);  // Show the paper after search
  };

  return (
    <div className="App">
      <h1> THE ANTHOLOGY OF TORTURED POETRY </h1>
      <SearchBar data={[]} onSearch={handleSearch} />

      {showPaper && (
        <div className="scrollable-container">
          <ul className="no-bullets">
            {searchResults.length > 0 ? (
              searchResults.map((item, index) => <li key={index}>{item}</li>)
            ) : (
              <p>No results found</p>
            )}
          </ul>
        </div>
      )}

    </div>
  );
}

export default App;