import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const RAWG_API_KEY = 'YOUR_RAWG_API_KEY'; // Get from rawg.io

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=20`)
      .then((response) => {
        setGames(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch games.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Games</h1>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {games.map((game) => (
          <div key={game.id} className="bg-gray-800 p-4 rounded">
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="text-xl mt-2">{game.name}</h2>
            <p>Released: {game.released}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;