import React, { useState } from 'react';

function SongSearch() {
  const [query, setQuery] = useState(''); // To capture the user's input
  const [recommendations, setRecommendations] = useState([]); // To store the recommendations
  const [loading, setLoading] = useState(false); // To track loading state

  // Function to handle search button click
  const handleSearch = () => {
    // Set loading state to true while fetching results
    setLoading(true);

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

  return (
    <div>
      <h2>Song Lyric Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query as user types
        placeholder="Search for lyrics..."
      />
      <button onClick={handleSearch} disabled={loading}>Search</button>

      {loading && <p>Loading...</p>}

      <ul>
        {recommendations.length > 0 ? (
          recommendations.map((song, index) => (
            <li key={index}>
              {song.song_title} (Score: {song.similarity_score.toFixed(4)})
            </li>
          ))
        ) : (
          <p>No recommendations found.</p>
        )}
      </ul>
    </div>
  );
}

export default SongSearch;
