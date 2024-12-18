import React, { useState } from 'react';
import TypewriterEffect from './TypewriterEffect';

function SongSearch() {
  const [query, setQuery] = useState(''); // To capture the user's input
  const [recommendations, setRecommendations] = useState([]); // To store the recommendations
  const [loading, setLoading] = useState(false); // To track loading state
  const [hasSearched, setHasSearched] = useState(false); // track wheter results should be shown

  // Function to handle search button click
  const handleSearch = () => {
    if (query.trim() === "") return;
    setHasSearched(true);
    setLoading(true); // Set loading state to true while fetching results

    // Fetch request to Flask API
    fetch(`http://127.0.0.1:5000/recommend?query=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        // Set the recommendations in the state
        setRecommendations(data.recommendations);
        setLoading(false); // Turn off loading state after fetching data
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
        setLoading(false); // Turn off loading state even if there's an error
      });
  };

  // Handle Enter key press event
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Trigger the search when Enter key is pressed
    }
    // instaed of <button onClick={handleSearch} disabled={loading}>Search</button> 
  };


  return (
    <div>
      <h2><TypewriterEffect text= "We hereby conduct this post mortem..." /> </h2>

      <div className="line"></div>

      <div className='search-bar-container'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query as user types 
          onKeyDown={handleKeyPress} // Enter key press 
          placeholder="Press Enter to search"
        /> 
      </div>

      {loading && <p>Loading...</p>}

      <div className="scrollable-container">
        <ul className = "no-bullets">
          {/* Only show the message after a search is performed */}
          {hasSearched && recommendations.length === 0 && !loading && (
            <p>No recommendations found.</p>
          )}

          {/* Show the recommendations if any are found */}
          {recommendations.length > 0 && recommendations.map((song, index) => (
            <li key={index}>
              {song.song_title} (Score: {song.similarity_score.toFixed(4)})
            </li>
          ))}
        </ul>
      </div>
      
    </div>

  );
}

export default SongSearch;
