import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function TVShows() {
  const [shows, setShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';

  useEffect(() => {
    fetchShows('trending/tv/week');
  }, []);

  const fetchShows = async (endpoint) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/${endpoint}`, {
        params: { api_key: TMDB_API_KEY, query: searchQuery || undefined },
      });
      setShows(response.data.results);
    } catch (err) {
      setError('Failed to fetch TV shows. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) fetchShows('search/tv');
    else fetchShows('trending/tv/week');
  };

  const addToFavorites = async (show) => {
    if (!user) return alert('Please log in to add favorites.');
    try {
      await axios.post(
        'http://localhost:5000/api/favorites',
        { 
          id: show.id, 
          title: show.name, 
          poster_path: show.poster_path,
          type: 'tv' 
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert(`${show.name} added to favorites!`);
    } catch (err) {
      console.error('Error adding to favorites:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">TV Shows</h1>
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a TV show..."
          className="w-full md:w-1/2 p-2 bg-gray-700 rounded-l text-white"
        />
        <button type="submit" className="p-2 bg-red-600 rounded-r">Search</button>
      </form>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {shows.map((show) => (
          <div key={show.id} className="bg-gray-800 p-4 rounded">
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="text-xl mt-2">{show.name}</h2>
            <p>{show.first_air_date}</p>
            <button
              onClick={() => addToFavorites(show)}
              className="mt-2 p-2 bg-red-600 rounded w-full"
            >
              Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TVShows; 