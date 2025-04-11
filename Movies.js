import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';

  useEffect(() => {
    fetchMovies('trending/movie/week');
  }, []);

  const fetchMovies = async (endpoint) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/${endpoint}`, {
        params: { api_key: TMDB_API_KEY, query: searchQuery || undefined },
      });
      setMovies(response.data.results);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) fetchMovies('search/movie');
    else fetchMovies('trending/movie/week');
  };

  const addToFavorites = async (movie) => {
    if (!user) return alert('Please log in to add favorites.');
    try {
      await axios.post(
        'http://localhost:5000/api/favorites',
        { id: movie.id, title: movie.title, poster_path: movie.poster_path },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert(`${movie.title} added to favorites!`);
    } catch (err) {
      console.error('Error adding to favorites:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Movies</h1>
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="w-full md:w-1/2 p-2 bg-gray-700 rounded-l text-white"
        />
        <button type="submit" className="p-2 bg-red-600 rounded-r">Search</button>
      </form>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 p-4 rounded">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="text-xl mt-2">{movie.title}</h2>
            <p>{movie.release_date}</p>
            <button
              onClick={() => addToFavorites(movie)}
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

export default Movies;