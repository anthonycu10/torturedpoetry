// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const [showPaper, setShowPaper] = useState(false); // State to control paper visibility
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    // Simulate search logic (e.g., filter data based on query)
    const data = ['Apple', 'Banana', 'Orange', 'Grapes', 'Blueberry', 'Strawberry', 'Pineapple', 'Mango'];
    const results = data.filter(item => item.toLowerCase().includes(query.toLowerCase()));

    setSearchResults(results);  // Update search results
    setShowPaper(true);  // Show the paper after search
  };

  return (
    <div className="App">
      <h1> THE ANTHOLOGY OF TORTURED POETRY </h1>
      <SearchBar data={[]} onSearch={handleSearch} />

      {showPaper && (
        <div className="paper-output">
          <h2>Search Results:</h2>
          <ul>
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
  
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;

